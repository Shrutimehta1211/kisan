import axios from 'axios';
import apiConfig from '../configs/api';

export const userRegister = async (values, dispatchUser) => {
  const data = values;
  const options = {
    method: "POST",
    url: `${apiConfig.url}/users/`,
    headers: {
      "Content-Type": "application/json",
    },
    data,
  };
  try {
    const res = await axios(options);
    localStorage.setItem(
      "pulzion",
      JSON.stringify({ token: res.data.token })
    );
    dispatchUser({
      type: "SET_USER",
      user: {
        ...res.data.user,
      },
    });
    return res.data.user;
  } catch (e) {
    console.log(e);
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
}

export const userLogin = async (
  values,
  dispatchUser,
) => {
  const options = {
    method: "POST",
    url: `${apiConfig.url}/users/login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };
  try {
    const res = await axios(options);
    localStorage.setItem(
      "pulzion",
      JSON.stringify({ token: res.data.token })
    );
    dispatchUser({
      type: "SET_USER",
      user: {
        ...res.data.user,
      },
    });
    return res.data.user;
  } catch (e) {
    console.log(e);
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const predictCrop = async (
  values
) => {
  const options = {
    method: "POST",
    url: `${apiConfig.url}/predict_crop`,
    headers: {
      "Content-Type": "application/json",
    },
    data: values,
  };
  try {
    const res = await axios(options);
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response) {
      return e?.response?.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
};

export const loadUser = async (dispatchUser) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion) {
    const options = {
      method: "GET",
      url: `${apiConfig.url}/users/me`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      dispatchUser({
        type: "SET_USER",
        user: {
          ...res.data.user,
        },
      });
      return {
        ...res.data.user,
      };
    } catch (e) {
      console.log(e);
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
};

export const logout = async (
  dispatchUser,
) => {
  const pulzion = JSON.parse(localStorage.getItem("pulzion"));
  if (pulzion) {
    const options = {
      method: "POST",
      url: `${apiConfig.url}/users/logout`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${pulzion.token}`,
      },
    };
    try {
      const res = await axios(options);
      localStorage.removeItem("pulzion");
      dispatchUser({
        type: "RESET_USER",
      });
      return res.data;
    } catch (e) {
      console.log(e);
      if (e?.response?.data) {
        return e.response.data;
      }
      return {
        error: "Something Went Wrong",
      };
    }
  }
};

export const predictDisease = async (files) => {
  try {
    const formData = new FormData();
    formData.append('files', files[0]);
    const options = {
      method: "POST",
      url: `https://agentcrop.azurewebsites.net/api/predict`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    const res = await axios(options);
    return res.data
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      error: "Something Went Wrong",
    };
  }
}