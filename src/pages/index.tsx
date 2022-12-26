import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/Layout'
import ResultsBlock from '../components/ResultsBlock'
import SearchInput from '../components/SearchInput'
import Title from '../components/Title'
import { countries } from '../data/TestCountries'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {

  return (
    <Layout>
      <main className={styles.main}>
        <Title />
        <section className={styles.contentWrapper}>
          <SearchInput />
          <ResultsBlock countries={countries}/>
        </section>
      </main>      
    </Layout>
  )
}

export default Home
