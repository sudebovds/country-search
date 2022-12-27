import type { NextApiRequest, NextApiResponse } from 'next'
import requestIp from 'request-ip'
import { ICountry, ISearchQueryInterface , ICountriesResponse, ILocation } from "../../models/index";
import { getCurrentLocation } from '../../helpers';


export const countDistanseBetweenCountries = (country: any, location: any) => {
  const countryLon = parseInt(country.lng, 10);
  const countryLat = parseInt(country.lat, 10);
  const locationLon = parseInt(location.lon, 10);
  const locationLat = parseInt(location.lat, 10);

  const distance = Math.sqrt(((locationLon) - (countryLon))**2 + ((locationLat) - (countryLat))**2);

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
                                                      ?.startsWith(string))
                                                      .map(country => ({
                                                              ...country,
                                                              distanceToLocation: countDistanseBetweenCountries(country, location)
                                                          }));
      const sortedData = filteredData.sort((nextCountry, prevCountry) => nextCountry.distanceToLocation - prevCountry.distanceToLocation);
      
      return sortedData;
  }
  catch(e){
      throw new Error()
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICountry[]>
) {
  if(req.method === 'GET'){
    const userIp = requestIp.getClientIp(req) ?? '213.208.132.223';
    const searchString = req.query.searchString?.toString() ?? '';
    const location: ILocation = await getCurrentLocation(userIp!);
    const dataResponse = await getCountries({ searchQuery: searchString, location });
  
    res.status(200).json(dataResponse)
  }
}
