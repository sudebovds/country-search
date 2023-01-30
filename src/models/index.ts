export interface ICountry {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            }
        };
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies: {
        [key: string]: {
          name: string;
          symbol: string;
        }
    };
    idd: {
        root: string;
        suffixes: string[];
    };
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: {
        [key: string]: string;
    };
    translations: {
        [key: string]: {
            official: string;
            common: string;
        }
    };
    latlng: [number, number];
    landlocked: boolean;
    area: number;
    flag: string;
    flags: {
        png: string;
        svg: string;
    };
    demonyms: {
        [key: string]: {
            [key: string]:string;
        }
    };
    population: number;
}
export type TCountriesResponse = ICountry[];
interface IExtendedCountriesList extends ICountry{
    distanceToLocation: number;
}

export type TCountriesResponseData = IExtendedCountriesList[];
export interface ILocation {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

export interface ISearchQueryInterface { 
    searchQuery: string;
    location: ILocation;
};