import axios, { AxiosResponse } from 'axios';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import Layout from '../../components/Layout'
/* import { getCountry } from '../../helpers'; */
import { ICountry } from '../../models';

// Styles
import styles from '../../styles/Country.module.css';

const Country: NextPage = () => {
  const router = useRouter();

  const countryName = useMemo(() => router.query.country?.toString(), [router]);
  const [country, setCountry] = useState<ICountry>();

  useEffect(() => {
    if(countryName){
      axios
      .get(`/api/country?country=${countryName}`)
      .then((response: AxiosResponse<ICountry>) => setCountry(response.data))
    }
  }, [countryName]);

  return (
    <Layout
      title={countryName}
    >
      {
        country && (
          <section className="">
              <header>
                <h1>{country.name}</h1>
              </header>
              <main className={styles.countryWrapper}>
                <div className={styles.row}>
                  <div><strong>Formal name: </strong></div>
                  <div>{country.name_forma}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Flag: </strong></div>
                  <div className={styles.flag}>
                    <Image 
                      src={`data:image/png;base64, ${country.flag_png}`}
                      alt={`${country.name} flag`}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                </div>
                <div className={styles.row}>
                  <div><strong>ISO name: </strong></div>
                  <div>{country.iso_n3}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Admin: </strong></div>
                  <div>{country.admin}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Population: </strong></div>
                  <div>{country.pop_est && new Intl.NumberFormat('en-EN').format(country.pop_est)}</div>
                </div>
                <div className={styles.row}>
                  <div><strong>Sovereignt: </strong></div>
                  <div>{country.sovereignt}</div>
                </div>
              </main>
            </section>
        )
      }
    </Layout>
  )
}

export default Country
