import React, { useEffect, useReducer, useState } from 'react'
import AppContext from '../context/AppContext';
import userReducer from '../reducers/userReducer';
import "../styles/global.css";
import { ToastContainer } from "react-toastify";
import { loadUser } from '../action/user';
import "react-toastify/dist/ReactToastify.css";
import Loader from '../Components/Loader';

const MyApp = ({ Component, pageProps }) => {
  const [user, dispatchUser] = useReducer(userReducer, {});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await loadUser(dispatchUser);
        if (userData?.error) {
          console.log(userData?.error);
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return !loading ? (
    <AppContext.Provider
      value={{
        user,
        dispatchUser,
      }}
    >
      <ToastContainer />
      <Component {...pageProps} />
    </AppContext.Provider>
  ) : (
    <Loader />
  )
}

export default MyApp