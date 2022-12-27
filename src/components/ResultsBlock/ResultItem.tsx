import Link from 'next/link';
import React from 'react'
import { ICountry } from '../../models'

//Styles
import styles from './ResultsBlock.module.css';

//Types
interface IResultItem{
    country: ICountry, 
    query: string
}

const ResultItem: React.FC<IResultItem> = ({ country, query }) => {
  const formatedQuery = query[0] ? query[0].toUpperCase() + query.slice(1) : '';
  const linkTitle = country.name?.split(formatedQuery) ?? '';

  return (
    <li className={styles.resultItem}>
        <Link 
        href={`/${country.name}`}
        >
            <a><b>{formatedQuery}</b>{linkTitle[1]}</a>
        </Link>
    </li>
  )
}

export default ResultItem