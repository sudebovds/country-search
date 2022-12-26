import Link from 'next/link';
import React from 'react'
import { ICountry } from '../../models'

//Styles
import styles from './ResultsBlock.module.css';

//Types
interface IResultItem{
    country: ICountry
}

const ResultItem: React.FC<IResultItem> = ({ country }) => {
  return (
    <li key={country.lat} className={styles.resultItem}>
        <Link 
        href={`/${country.name}`}
        >
            <a>{country.name}</a>
        </Link>
    </li>
  )
}

export default ResultItem