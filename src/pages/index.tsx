import axios, { AxiosResponse } from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import ResultsBlock from '../components/ResultsBlock'
import SearchInput from '../components/SearchInput'
import Title from '../components/Title'
import { getCurrentLocation } from '../helpers'
import useDebounce from '../hooks/useDebounce'
import { ICountry, ILocation } from '../models'

//Styles
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [location, setLocation] = useState<ILocation>();
  const [countries, setCountries] = useState<ICountry[]>([]);
  const [isDropdown, setIsDropdown] = useState(false);
  const debounced = useDebounce(searchQuery);

  useEffect(() => {
    getCurrentLocation().then(loc => setLocation(loc));

    return setLocation(undefined)
  }, [])

  useEffect(() => {
    if(debounced.length > 0 && location){
      axios
        .get(`/api/countries/?searchString=${debounced}&location=${JSON.stringify(location)}`)
        .then((response: AxiosResponse<ICountry[]>) => setCountries(response.data));
      
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
