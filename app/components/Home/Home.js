import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home () {
  return (
    <div className={container}>
      <p className={title}>{'Admin Dashboard'}</p>
      <p className={slogan}>{'The real time, cloud based, modular, scalable, content management system. In the cloud.'}</p>
    </div>
  )
}
