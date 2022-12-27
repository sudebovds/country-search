import { ICountry, ICountriesResponse } from './../../models/index';
import type { NextApiRequest, NextApiResponse } from 'next'

export const getCountry = async (countryName: string = ''): Promise<ICountry[]> => {
    try{
        const getCountry = await fetch(`${process.env.LOCAL_HOST}/data/countries_metadata.json`);
        const data: ICountriesResponse = await getCountry.json();

        const country: ICountry[] = data.countries.filter(country => country.name?.toLowerCase() === countryName.toLowerCase());

        return country;
    }
    catch(e){
        throw new Error()
    }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ICountry>
  ) {
    if(req.method === 'GET'){
      const countryName = req.query.country?.toString() ?? '';
      const dataResponse = await getCountry(countryName);
    
      res.status(200).json(dataResponse[0])
    }
  }