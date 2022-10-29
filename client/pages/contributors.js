import React from 'react'
import Layout from '../Components/Layout'
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter, FaGit } from "react-icons/fa";

const Contributors = () => {
    return (
        <Layout>
            <div className='px-10 sm:px-20 py-5'>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="flex flex-col items-center justify-center bg-white p-4 shadow rounded-lg">
                        <div className="inline-flex shadow-lg border border-gray-200 rounded-full overflow-hidden h-40 w-40">
                            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&w=128&h=128&q=60&facepad=2"
                                alt="PROFILE"
                                className="h-full w-full" />
                        </div>

                        <h2 className="mt-4 font-bold text-xl">Sebastian Bennett</h2>

                        <p className="text-xs text-gray-500 text-center mt-3">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab enim molestiae nulla.
                        </p>

                        <ul className="flex flex-row mt-4 space-x-2">
                            <li>
                                <a href="" className="flex items-center justify-center h-10 w-10 border rounded-full text-gray-800 border-gray-800 text-xl">
                                    <FaLinkedin />
                                </a>
                            </li>
                            <li>
                                <a href="" className="flex items-center justify-center h-10 w-10 border rounded-full text-gray-800 border-gray-800 text-xl">
                                    <FaGit />
                                </a>
                            </li>
                            <li>
                                <a href="" className="flex items-center justify-center h-10 w-10 border rounded-full text-gray-800 border-gray-800 text-xl">
                                    <FaInstagram />
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Contributors