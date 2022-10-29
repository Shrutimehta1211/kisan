import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { logout } from '../action/user';
import AppContext from '../context/AppContext';

const publicLinks = [
    {
        text: "Home",
        to: "/"
    },
    {
        text: "Contributors",
        to: "/contributors"
    },
]

const privateLinks = [
    {
        text: "Home",
        to: "/"
    },
    {
        text: "Contributors",
        to: "/contributors"
    },
    {
        text: "Predict Crop",
        to: "/predict_crop"
    },
    {
        text: "Predict Disease",
        to: "/predict_disease"
    },
]

const Header = () => {

    const [visible, setVisible] = useState(false);
    const { user, dispatchUser } = useContext(AppContext);

    const router = useRouter();

    const handleHeader = () => {
        setVisible(!visible)
    }

    const handleLogout = async () => {
        try {
            const data = await logout(dispatchUser);
            if (data?.error) {
                console.log(data.error)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/" className="flex items-center">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                    <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">KrushiVikas</span>
                </Link>
                <button onClick={handleHeader} data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                </button>
                <div className={`${visible ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-default">
                    <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            !user?._id && publicLinks.map((link) => (
                                <li
                                    key={link.text}
                                >
                                    <Link
                                        href={link.to}
                                        className={`block py-2 pr-4 pl-3 text-white ${router.pathname === link.to ? "bg-blue-700 text-white md:text-blue-700" : "text-black"} rounded md:bg-transparent md:p-0 dark:text-white text-lg hover:text-blue-700`}
                                        aria-current="page"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            )
                            )
                        }
                        {
                            user?._id && privateLinks.map((link) => (
                                <li
                                    key={link.text}
                                >
                                    <Link
                                        href={link.to}
                                        className={`block py-2 pr-4 pl-3 text-white ${router.pathname === link.to ? "bg-blue-700 text-white md:text-blue-700" : "text-black"} rounded md:bg-transparent md:p-0 dark:text-white text-lg hover:text-blue-700`}
                                        aria-current="page"
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            )
                            )
                        }
                        {user?._id &&
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                >
                                    Logout
                                </button>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Header