import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { predictDisease } from '../action/user';
import ContentLoader from '../Components/ContentLoader';
import Layout from '../Components/Layout'
import privateRoute from '../routes/privateRoute'

const PredictDisease = () => {

  const [images, setImages] = useState();
  const [loading, setLoading] = useState(false);

  const [predction, setPrediction] = useState();
  const [position, setPosition] = useState();

  const handleChange = (e) => {
    setImages(e.target.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if(!images || images?.length < 0) {
      toast.error("Upload an image")
      setLoading(false)
      return
    }
    try {
      const data = await predictDisease(images);
      if (data?.Error) {
        toast(data.Error)
        setLoading(false);
        return
      }
      if (data?.error) {
        toast(data.error)
        setLoading(false);
        return
      }
      const keys = Object.keys(data)
      setPrediction({
        ...data?.[keys[0]],
        file: images[0].name
      })
    } catch (e) {
      console.log(e)
    }
    setLoading(false);
  }

  return (
    <Layout>
      <div className='w-full flex items-center justify-center' style={{
        minHeight: "80vh"
      }}>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-10/12 max-w-lg">
          {!predction?.description ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-6">
                <label for="email" className="form-label inline-block mb-2 text-gray-700">Plant Image</label>
                <input
                  type="file"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="image"
                  name="image"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Predict
              </button>
            </form>
          ) : (
            <div>
              <div>
                <p className='font-bold'>Prediction:</p>
                <p className='mb-2'>{predction.prediction}</p>
                <p className='font-bold'>Description:</p>
                <p className='mb-2'>{predction.description}</p>
              </div>
              <button onClick={()=>setPrediction()} type="button" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                Back
              </button>
            </div>
          )}
          {loading && <ContentLoader />}
        </div>
      </div>
    </Layout>
  )
}

export default privateRoute(PredictDisease)