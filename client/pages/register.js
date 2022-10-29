import React, { useContext, useState } from 'react'
import Link from 'next/link'
import Layout from '../Components/Layout'
import { userRegister } from '../action/user'
import { toast } from 'react-toastify'
import AppContext from '../context/AppContext'
import { useFormik } from "formik";
import * as Yup from "yup";
import publicRoute from '../routes/publicRoute'

const validationSchema = Yup.object({
    firstName: Yup.string().trim().required("Required"),
    lastName: Yup.string().trim().required("Required"),
    email: Yup.string().trim().email("Invalid email address").required("Required"),
    password: Yup.string().trim().test(
        "len",
        "Minimum 8 Characters",
        (val) => val?.toString()?.length >= 8
    ).required("Required"),
})

const Register = () => {
    const { dispatchUser } = useContext(AppContext);
    const [loading, setLoading] = useState(false);

    const handleRegister = async (values) => {
        try {
            setLoading(true);
            const data = await userRegister(values, dispatchUser);
            if (data?.error) {
                toast.error(data.error)
            }
        } catch (e) {
            console.log(e);
            toast.error('Something Went Wrong')
        }
        setLoading(false)
    }
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: handleRegister
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
                                <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="firstName"
                                    name="firstName"
                                    aria-describedby="emailHelp123"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="First name"
                                />
                                {formik.touched.firstName && formik.errors.firstName ? (
                                    <div className="text-red-500">{formik.errors.firstName}</div>
                                ) : null}

                            </div>
                            <div className="form-group mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    id="lastName"
                                    name="lastName"
                                    aria-describedby="emailHelp124"
                                    placeholder="Last name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName ? (
                                    <div className="text-red-500">{formik.errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                        <div className="form-group mb-6">
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
                            <input type="password"
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
                            Sign up
                        </button>
                        <p className="text-gray-800 mt-6 text-center">Already a member? <Link href="/login"
                            className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default publicRoute(Register)