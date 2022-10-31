import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { predictCrop } from '../action/user'
import Layout from '../Components/Layout'
import privateRoute from '../routes/privateRoute'
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentLoader from '../Components/ContentLoader'

const PredictCrop = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [position, setPosition] = useState()


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setPosition(position)
    });
  }, [])
  console.log(position);

  const handlePrediction = async () => {
    try {
      setLoading(true);
      setMessage("")
      const data = await predictCrop({
        lat: position.coords.latitude,
        long: position.coords.longitude
      });
      if (data?.error) {
        toast.error(data.error)
      }
      setMessage(data.message)
    } catch (e) {
      console.log(e);
      toast.error('Something Went Wrong')
    }
    setLoading(false)
  }
  return (
    <Layout>
      <div className='w-full flex items-center justify-center' style={{
        minHeight: "80vh"
      }}>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-10/12 max-w-lg">
          {position ?
            (
              <div>
                <p className='text-lg font-bold'>We have detected your location!</p>
                <p>Latitude: {position.coords.latitude}</p>
                <p>Longitude: {position.coords.longitude}</p>
                <button onClick={handlePrediction} type="button" className="mt-2 w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                  Predict
                </button>
              </div>
            )
            : (
              <div>
                <p>We cannot detect your location!</p>
                <p>Please check your permissions</p>
              </div>
            )

          }
          {message && <p className='mt-5 text-center text-lg'>{message}</p>}
          {loading && <ContentLoader />}
        </div>
      </div>
    </Layout>
  )
}

export default privateRoute(PredictCrop)