import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { userLogin } from '../action/user';
import Layout from '../Components/Layout'
import AppContext from '../context/AppContext';
import { useFormik } from "formik";
import * as Yup from "yup";
import publicRoute from '../routes/publicRoute';

const validationSchema = Yup.object({
  email: Yup.string().trim().email("Invalid email address").required("Required"),
  password: Yup.string().trim().test(
    "len",
    "Minimum 8 Characters",
    (val) => val?.toString()?.length >= 8
  ).required("Required"),
})

const Login = () => {
  const { dispatchUser } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      const data = await userLogin(values, dispatchUser);
      if (data?.error) {
        toast.error(data.error);
      }
    } catch (e) {
      console.log(e)
      toast.error('Something Went Wrong')
    }
    setLoading(false)
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin
  });

  return (
    <Layout>
      <div className='w-full flex items-center justify-center' style={{
        minHeight: "80vh"
      }}>
        <div className="block p-6 rounded-lg shadow-lg bg-white w-10/12 max-w-lg">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-6">
              <label for="email" className="form-label inline-block mb-2 text-gray-700">Email address</label>
              <input
                type="email"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="email"
                name="email"
                placeholder="Email address"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="form-group mb-6">
              <label for="password" className="form-label inline-block mb-2 text-gray-700">Password</label>
              <input
                type="password"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <button type="submit" className="w-full px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              Sign in
            </button>
            <p className="text-gray-800 mt-6 text-center">Not a member? <Link href="/register"
              className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default publicRoute(Login);