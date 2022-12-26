import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/Layout'

const Country = () => {
  const router = useRouter();

  const pageTitle = router.query.country?.toString();

  return (
    <Layout
      title={pageTitle}
    >
      <h1>{pageTitle}</h1>
    </Layout>
  )
}

export default Country