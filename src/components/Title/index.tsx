import React from 'react';

// Styles
import styles from './Title.module.css';

// Types
type TitleType = {
    text?: string;
}

const Title: React.FC<TitleType> = ({ 
    text = 'Find the closest country'
 }) => (
    <section className={styles.title}>
        <h1>{text}</h1>
    </section>
  )

Title.defaultProps={
    text: 'Find the closest country'
}

export default Title