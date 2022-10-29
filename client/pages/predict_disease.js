import React from 'react'
import Layout from '../Components/Layout'
import privateRoute from '../routes/privateRoute'

const PredictDisease = () => {
  return (
      <Layout></Layout>
  )
}

export default privateRoute(PredictDisease)