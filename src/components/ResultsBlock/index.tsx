import React from 'react'
import { TCountriesResponseData } from '../../models'
import ResultItem from './ResultItem';

// Styles
import styles from './ResultsBlock.module.css';

interface IResultBlockInterface{
  countries: TCountriesResponseData;
  query: string;
}

const ResultsBlock: React.FC<IResultBlockInterface> = ({ countries, query }) => (
    <ul className={styles.resultsWrapper}>
        {
            countries.length > 0 ? countries.map(country => <ResultItem 
                      key={`${country.capital}${country.latlng[0]}`}
                      country={country}
                      query={query}
                    />) : <p className={styles.noMathces}>No matches found</p>
        }
    </ul>
  )

export default ResultsBlock