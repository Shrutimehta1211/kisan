import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { predictCrop } from '../action/user'
import Layout from '../Components/Layout'
import privateRoute from '../routes/privateRoute'
import { useFormik } from "formik";
import * as Yup from "yup";
import ContentLoader from '../Components/ContentLoader'

const validationSchema = Yup.object({
  nitrogen: Yup.string().required("Required"),
  phosphorus: Yup.string().required("Required"),
  potassium: Yup.string().required("Required"),
  temperature: Yup.string().required("Required"),
  humidity: Yup.string().required("Required"),
  ph: Yup.string().required("Required"),
  rainfall: Yup.string().required("Required"),
  water: Yup.string().required("Required"),
})

const PredictCrop = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePrediction = async (values) => {
    try {
      setLoading(true);
      setMessage("")
      const data = await predictCrop(values);
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
  const formik = useFormik({
    initialValues: {
      nitrogen: "",
      phosphorus: "",
      potassium: "",
      temperature: "",
      humidity: "",
      ph: "",
      rainfall: "",
      water: "",
    },
    validationSchema,
    onSubmit: handlePrediction
  });
  return (
    <Layout>
      <div className='w-full flex items-center justify-center' style={{
        minHeight: "80vh"
      }}>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-10/12 max-w-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label for="nitrogen" className="form-label inline-block mb-2 text-gray-700">Nitrogen</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="nitrogen"
                  name="nitrogen"
                  aria-describedby="emailHelp123"
                  value={formik.values.nitrogen}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nitrogen"
                />
                {formik.touched.nitrogen && formik.errors.nitrogen ? (
                  <div className="text-red-500">{formik.errors.nitrogen}</div>
                ) : null}

              </div>
              <div className="form-group mb-6">
                <label for="phosphorus" className="form-label inline-block mb-2 text-gray-700">Phosphorous</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="phosphorus"
                  name="phosphorus"
                  aria-describedby="emailHelp124"
                  placeholder="phosphorus"
                  value={formik.values.phosphorus}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phosphorus && formik.errors.phosphorus ? (
                  <div className="text-red-500">{formik.errors.phosphorus}</div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label for="potassium" className="form-label inline-block mb-2 text-gray-700">Potassium</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="potassium"
                  name="potassium"
                  aria-describedby="emailHelp123"
                  value={formik.values.potassium}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Potassium"
                />
                {formik.touched.potassium && formik.errors.potassium ? (
                  <div className="text-red-500">{formik.errors.potassium}</div>
                ) : null}

              </div>
              <div className="form-group mb-6">
                <label for="temperature" className="form-label inline-block mb-2 text-gray-700">Temperature</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="temperature"
                  name="temperature"
                  aria-describedby="emailHelp124"
                  placeholder="Temperature"
                  value={formik.values.temperature}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.temperature && formik.errors.temperature ? (
                  <div className="text-red-500">{formik.errors.temperature}</div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label for="humidity" className="form-label inline-block mb-2 text-gray-700">Humidity</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="humidity"
                  name="humidity"
                  aria-describedby="emailHelp123"
                  value={formik.values.humidity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Humidity"
                />
                {formik.touched.humidity && formik.errors.humidity ? (
                  <div className="text-red-500">{formik.errors.humidity}</div>
                ) : null}

              </div>
              <div className="form-group mb-6">
                <label for="ph" className="form-label inline-block mb-2 text-gray-700">PH</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="ph"
                  name="ph"
                  aria-describedby="emailHelp124"
                  placeholder="PH"
                  value={formik.values.ph}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.ph && formik.errors.ph ? (
                  <div className="text-red-500">{formik.errors.ph}</div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-group mb-6">
                <label for="water" className="form-label inline-block mb-2 text-gray-700">Water</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="water"
                  name="water"
                  aria-describedby="emailHelp123"
                  value={formik.values.water}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Water Level"
                />
                {formik.touched.water && formik.errors.water ? (
                  <div className="text-red-500">{formik.errors.water}</div>
                ) : null}

              </div>
              <div className="form-group mb-6">
              <label for="rainfall" className="form-label inline-block mb-2 text-gray-700">Rainfall</label>
                <input
                  type="number"
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="rainfall"
                  name="rainfall"
                  aria-describedby="emailHelp124"
                  placeholder="Rainfall"
                  value={formik.values.rainfall}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.rainfall && formik.errors.rainfall ? (
                  <div className="text-red-500">{formik.errors.rainfall}</div>
                ) : null}
              </div>
            </div>
            <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Predict
            </button>
          </form>
          {message && <p className='mt-5 text-center text-lg'>{message}</p>}
          {loading && <ContentLoader />}
        </div>
      </div>
    </Layout>
  )
}

export default privateRoute(PredictCrop)