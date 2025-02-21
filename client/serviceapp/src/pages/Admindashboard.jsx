import React from 'react'
import axios from "../axios";
import Addprovider from './Addprovider'
import Serviceproviderlist from './Serviceproviderlist'

const Admindashboard = () => {
  return (
    <div>
    <Addprovider/>
      <Serviceproviderlist/>
    </div>
  )
}

export default Admindashboard
