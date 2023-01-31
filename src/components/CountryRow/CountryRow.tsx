import React, { FC } from 'react'

interface ICountryRowInterface{
    className: string;
    title: string;
    content: React.ReactNode;
}

const CountryRow: FC<ICountryRowInterface> = ({ title, content, className }) => {
  return (
    <div className={className}>
        <div><strong>{title}</strong></div>
        <div>{content}</div>
    </div>
  )
}

export default CountryRow