import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import { ICountry } from '../../models'

// Styles
import styles from './ResultsBlock.module.css';

// Types
interface IResultItem{
    country: ICountry, 
    query: string
}

const ResultItem: React.FC<IResultItem> = ({ country, query }) => {
  const formatedQuery = query[0] ? query[0].toUpperCase() + query.slice(1) : '';
  const linkTitle = country.name.common?.split(formatedQuery) ?? '';
  const countryLink = country.name.common.toLowerCase();
  const countryFlagsLink = country.flags.svg ?? country.flags.png ?? '';

  return (
    <li className={styles.resultItem}>
        <Link 
        href={`/${countryLink}`}
        >
            <a className={styles.resultItem__link}>
              <span className={styles.resultsItem__image}>
                <Image 
                  src={countryFlagsLink}
                  width={30}
                  height={25}
                  alt={country.name.common}
                />
              </span>
              <b>{formatedQuery}</b>{linkTitle[1]}
            </a>
        </Link>
    </li>
  )
}

export default ResultItem