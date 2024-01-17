import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({children}) {
  return (
    <div className='container-fluid'>
      <Header/>
      <main className='main'>{children}</main>
      <Footer className='fixed-bottom'/>
        </div>
  )
}
