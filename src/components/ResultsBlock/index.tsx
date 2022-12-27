import React from 'react'
import { ICountriesResponse } from '../../models'
import ResultItem from './ResultItem';

// Styles
import styles from './ResultsBlock.module.css';

interface IResultBlockInterface extends ICountriesResponse{
  query: string
}

const ResultsBlock: React.FC<IResultBlockInterface> = ({ countries, query }) => (
    <ul className={styles.resultsWrapper}>
        {
            countries.length > 0 ? countries.map(country => <ResultItem 
                      key={`${country.pop_est}${country.adm0_a3}`}
                      country={country}
                      query={query}
                    />) : <p className={styles.noMathces}>No matches found</p>
        }
    </ul>
  )

export default ResultsBlock