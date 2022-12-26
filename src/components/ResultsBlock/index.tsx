import React from 'react'
import { ICountriesResponse } from '../../models'
import ResultItem from './ResultItem';

//Styles
import styles from './ResultsBlock.module.css';

const ResultsBlock: React.FC<ICountriesResponse> = ({ countries }) => {
  return (
    <ul className={styles.resultsWrapper}>
        {
            countries && countries.map(country => {
            return <ResultItem country={country}/>
            })
        }
    </ul>
  )
}

export default ResultsBlock