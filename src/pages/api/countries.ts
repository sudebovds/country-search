import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { TCountriesResponseData , ICountry, ISearchQueryInterface , TCountriesResponse, ILocation } from "../../models/index";

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


export const countDistanseBetweenCountries = (country: ICountry, location: any) => {
  const countryLonRad = (country.latlng[1] * Math.PI) / 180;
  const countryLatRad = (country.latlng[0] * Math.PI) / 180;
  const locationLonRad = (parseInt(location.lon, 10) * Math.PI) / 180;
  const locationLatRad = (parseInt(location.lat, 10) * Math.PI) / 180;

  const E_RADIUS: number = 6371;
  const havsinLat = Math.sin((locationLatRad - countryLatRad) / 2)**2;
  const havsinLon = Math.sin((locationLonRad - countryLonRad) / 2)**2;

  const distance = 2 * E_RADIUS * Math.asin(Math.sqrt(havsinLat + Math.cos(countryLatRad) * Math.cos(locationLatRad) * havsinLon));

  return distance;
}

export const getCountries = async ({ searchQuery, location }: ISearchQueryInterface): Promise<TCountriesResponse | undefined> => {
  const string = searchQuery.trim(); 

  try{
      const response = await fetch(`https://restcountries.com/v3.1/name/${string}`)

      const data: TCountriesResponse = await response.json();
      const filteredData = data
                              .filter(country => country
                                                      .name.common
                                                      ?.toLowerCase()
                                                      ?.startsWith(string.toLowerCase()))
                                                      .map(country => ({
                                                              ...country,
                                                              distanceToLocation: countDistanseBetweenCountries(country, location)
                                                          }));
      const sortedData: TCountriesResponseData = filteredData.sort((nextCountry, prevCountry) => nextCountry.distanceToLocation - prevCountry.distanceToLocation);
      
      return sortedData;
  }
  catch(e: any){
      throw new Error('Data fetching error: ', e);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TCountriesResponse | undefined>
) {
  if(req.method === 'GET'){
    const userIp = requestIp.getClientIp(req) === '::1' ? '88.201.168.228' : requestIp.getClientIp(req);
    const searchString = req.query.searchString?.toString() ?? '';
    const location: ILocation = await getCurrentLocation(userIp!);
    const dataResponse = await getCountries({ searchQuery: searchString, location });
  
    res.status(200).json(dataResponse);
  }
}
