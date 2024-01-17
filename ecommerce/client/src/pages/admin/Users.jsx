import React from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from './AdminMenu'

export default function Users() {
  return (
    <Layout>
      <div className='row'>
        <div className='col-md-4'>
          <AdminMenu/>
        </div>
        <div className='col-md-8'>users</div>
      </div>
    </Layout>
  )
}
