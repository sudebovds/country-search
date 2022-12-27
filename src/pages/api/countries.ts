import { ICountry, ISearchQueryInterface } from './../../models/index';
import { ICountriesResponse, ILocation } from '../../models/index';

import type { NextApiRequest, NextApiResponse } from 'next'

export const countDistanseBetweenCountries = (country: any, location: any) => {
  const countryLon = parseInt(country.lng);
  const countryLat = parseInt(country.lat);
  const locationLon = parseInt(location.lon);
  const locationLat = parseInt(location.lat);

  const distance = Math.sqrt(Math.pow(((locationLon) - (countryLon)), 2) + Math.pow(((locationLat) - (countryLat)), 2));

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
                                                      .map(country => {
                                                          return {
                                                              ...country,
                                                              distanceToLocation: countDistanseBetweenCountries(country, location)
                                                          }
                                                      });
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
    const searchString = req.query.searchString?.toString() ?? '';
    const location: ILocation = req.query.location && JSON.parse(req.query.location?.toString());
    const dataResponse = await getCountries({ searchQuery: searchString, location });
  
    res.status(200).json(dataResponse)
  }
}
