import Head from 'next/head'
import React from 'react'

// Styles
import styles from './Layout.module.css'

type LayoutType = {
    children: React.ReactNode;
    title?: string;
    description?: string;
}

const Layout: React.FC<LayoutType> = ({ 
    children,
    title = 'Countries search app',
    description = 'Countries search app'
}) => (
    <div className={styles.container}>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        {children}
    </div>
  )

  Layout.defaultProps={
    title: 'Countries search app',
    description: 'Countries search app'
  }

export default Layout