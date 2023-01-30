import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
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
  const countryCurrencies = useMemo(() => country && Object.keys(country.currencies)[0], [country])

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
                <div className={styles.row}>
                  <div><strong>Official name: </strong></div>
                  <div>{country.name.official}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Flag: </strong></div>
                  <div className={styles.flag}>
                    <Image 
                      src={country.flags.svg}
                      alt={`${country.name.common} flag`}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div><strong>Capital: </strong></div>
                  <div>{country.capital}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Is independent: </strong></div>
                  <div>{country.independent ? 'Independent' : 'No'}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Area: </strong></div>
                  <div>{country.area} sqr. km</div>
                </div>
                {country && countryNativeName && <div className={styles.row}>
                  <div><strong>Native name: </strong></div>
                  <div>{country.name.nativeName[countryNativeName].official}</div>
                </div>}
                {country && countryCurrencies && <div className={styles.row}>
                  <div><strong>Currencies: </strong></div>
                  <div>{country.currencies[countryCurrencies].name} ({country.currencies[countryCurrencies].symbol})</div>
                </div>}
                {country && country.population && <div className={styles.row}>
                  <div><strong>Population: </strong></div>
                  <div>{new Intl.NumberFormat('en-EN').format(country.population)} piople</div>
                </div>}
              </main>
            </section>
        )
      }
    </Layout>
  )
}

export default Country
