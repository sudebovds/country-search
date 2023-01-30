/* import axios, { AxiosResponse } from 'axios' */
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ResultsBlock from '../components/ResultsBlock'
import SearchInput from '../components/SearchInput'
import Title from '../components/Title'
import useDebounce from '../hooks/useDebounce'
import { TCountriesResponseData } from '../models'

// Styles
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [countries, setCountries] = useState<TCountriesResponseData>([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const debounced = useDebounce(searchQuery);

  useEffect(() => {
    if(debounced.length > 0){
      fetch(`/api/countries/?searchString=${debounced}`)
        .then((response: Response) => response.json())
        .then((data: TCountriesResponseData) => setCountries(data));
      
      setIsDropdown(true)
    }
    else{
      setIsDropdown(false)
    }

    return setCountries([])
  }, [debounced]);

  return (
    <Layout>
      <main className={styles.main}>
        <Title />
        <section className={styles.contentWrapper}>
          <SearchInput 
            query={searchQuery}
            setQuery={setSearchQuery}
          />
          {isDropdown && <ResultsBlock countries={countries} query={searchQuery} />}
        </section>
      </main>      
    </Layout>
  )
}

export default Home
