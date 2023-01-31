import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import CountryRow from '../../components/CountryRow/CountryRow';
import Layout from '../../components/Layout'
import { ICountry } from '../../models';

// Styles
import styles from '../../styles/Country.module.css';

const Country: NextPage = () => {
  const router = useRouter();

  const countryName = useMemo(() => {
    const countryName = router.query.country ? router.query.country.toString() : '';

    return countryName;

  }, [router]);

  const [country, setCountry] = useState<ICountry>();

  useEffect(() => {
    if(countryName){
      fetch(`/api/country?country=${countryName}`)
        .then((response: Response) => response.json())
        .then((data: ICountry) => setCountry(data))
    }
  }, [countryName]);

  const countryNativeName = useMemo(() => country && country.name.nativeName && Object.keys(country.name.nativeName)[0], [country]);
  const countryCurrencies = useMemo(() => country && Object.keys(country.currencies)[0], [country]);

  return (
    <Layout
      title={countryName}
    >
      {
        country && (
          <section className="">
              <header>
                <h1>{country.name.official}</h1>
              </header>
              <main className={styles.countryWrapper}>
                <CountryRow 
                  className={styles.row}
                  title={'Official name: '}
                  content={country.name.official}
                />
                <CountryRow 
                  className={styles.row}
                  title={'Flag: '}
                  content={
                    <div className={styles.flag}>
                    <Image 
                      src={country.flags.svg}
                      alt={`${country.name.common} flag`}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                  }
                />
                <CountryRow 
                  className={styles.row}
                  title={'Capital: '}
                  content={country.capital}
                />
                <CountryRow 
                  className={styles.row}
                  title={'Is independent: '}
                  content={country.independent ? 'Independent' : 'No'}
                />
                <CountryRow 
                  className={styles.row}
                  title={'Area: '}
                  content={`${country.area} sqr. km`}
                />
                {
                  country && countryNativeName &&                 
                  <CountryRow 
                  className={styles.row}
                  title={'Native name: '}
                  content={country.name.nativeName[countryNativeName].official}
                />
                }                                                 
                {country && countryCurrencies && 
                  <CountryRow 
                    className={styles.row}
                    title={'Currencies: '}
                    content={`${country.currencies[countryCurrencies].name} (${country.currencies[countryCurrencies].symbol})`}
                  />
                }
                {
                  country && country.population && 
                  <CountryRow 
                    className={styles.row}
                    title={'Population: '}
                    content={`${new Intl.NumberFormat('en-EN').format(country.population)} people`}
                  />
                }
              </main>
            </section>
        )
      }
    </Layout>
  )
}

export default Country
