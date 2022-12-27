import React, { Dispatch } from 'react'

// Styles
import styles from './SearchInput.module.css';

// Types

interface ISearchInputInterface{
    query?: string;
    setQuery: Dispatch<string>;
}

const SearchInput: React.FC<ISearchInputInterface> = ({ query, setQuery }) => {
  const changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const newValue = e.currentTarget.value ? e.currentTarget.value : '';
    setQuery(newValue)
  }

  return (
    <input 
        type='text'
        placeholder='Find the country'
        className={styles.searchInput}
        value={query}
        onChange={e => changeValueHandler(e)}
    />
  )
}

SearchInput.defaultProps={
  query: ''
}

export default SearchInput