import React, { Dispatch } from 'react'

//Styles
import styles from './SearchInput.module.css';

//Types

interface ISearchInputInterface{
    query?: string;
    setQuery?: Dispatch<string>;
}

const SearchInput: React.FC<ISearchInputInterface> = ({ query, setQuery }) => {
  return (
    <input 
        type='text'
        placeholder='Find the country'
        className={styles.searchInput}
    />
  )
}

export default SearchInput