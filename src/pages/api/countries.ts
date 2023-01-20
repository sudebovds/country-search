import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { ICountry, ISearchQueryInterface , ICountriesResponse, ILocation } from "../../models/index";

export const getCurrentLocation = async (userIP: string) => {
  try{
      const getLocation = await fetch(`http://ip-api.com/json/${userIP}`, { method: "GET", mode: 'cors', headers: { 'Content-Type': 'application/json',}});
      const location = await getLocation.json();

      return location;
  } 
  catch(e: any){
    throw new Error('This is the error in the location detection: ', e)
}
}


export const countDistanseBetweenCountries = (country: any, location: any) => {
  const countryLonRad = (parseInt(country.lng, 10) * Math.PI) / 180;
  const countryLatRad = (parseInt(country.lat, 10) * Math.PI) / 180;
  const locationLonRad = (parseInt(location.lon, 10) * Math.PI) / 180;
  const locationLatRad = (parseInt(location.lat, 10) * Math.PI) / 180;

  const E_RADIUS: number = 6371;
  const havsinLat = Math.pow(Math.sin((countryLatRad - locationLatRad) / 2), 2);
  const havsinLon = Math.pow(Math.sin((countryLonRad - locationLonRad) / 2), 2);

  const distance = 2 * E_RADIUS * Math.sqrt(havsinLat + Math.cos(countryLatRad) * Math.cos(locationLatRad) * havsinLon);

  return distance;
}

export const getCountries = async ({ searchQuery, location }: ISearchQueryInterface): Promise<ICountry[]> => {
  const string = searchQuery.trim(); 

  try{
      const response = await fetch(`${process.env.LOCAL_HOST}/data/countries_metadata.json`);

      const data: ICountriesResponse = await response.json();
      const filteredData = data
                              .countries
                              .filter(country => country
                                                      .name
                                                      ?.toLowerCase()
                                                      ?.startsWith(string.toLowerCase()))
                                                      .map(country => ({
                                                              ...country,
                                                              distanceToLocation: countDistanseBetweenCountries(country, location)
                                                          }));
      const sortedData = filteredData.sort((nextCountry, prevCountry) => nextCountry.distanceToLocation - prevCountry.distanceToLocation);
      
      return sortedData;
  }
  catch(e: any){
      throw new Error('This is the error: ', e)
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountry[]>
) {
  if(req.method === 'GET'){
    const userIp = requestIp.getClientIp(req) && requestIp.getClientIp(req) !== '::1' ? requestIp.getClientIp(req) : '213.208.132.223';
    const searchString = req.query.searchString?.toString() ?? '';
    const location: ILocation = await getCurrentLocation(userIp!);
    const dataResponse = await getCountries({ searchQuery: searchString, location });
  
    res.status(200).json(dataResponse)
  }
}
