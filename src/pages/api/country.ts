import type { NextApiRequest, NextApiResponse } from 'next'
import { ICountry, TCountriesResponse } from "../../models/index";

export const getCountry = async (countryName: string = ''): Promise<ICountry> => {
    try{
        const getCountry = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data: TCountriesResponse = await getCountry.json();


        return data[0];
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
    
      res.status(200).json(dataResponse)
    }
  }
