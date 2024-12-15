import axios from "axios";
const baseurl = import.meta.env.VITE_API_URL;

const userSignUp = async (userInput) => {
  console.log("baseurl is ", baseurl);
  return axios.post(`${baseurl}/user/signup`, userInput);
};

const userLogin = async (credentials) => {
  return axios.post(`${baseurl}/user/login`, credentials);
};

const captainSignUp = async (captainInput) => {
  return axios.post(`${baseurl}/captain/signup`, captainInput);
};

const captainLogin = async (credentials) => {
  return axios.post(`${baseurl}/captain/login`, credentials);
};
const getCaptainProfile = async (token) => {
  return axios.get(`${API_URL}/captain/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getUserProfile = async (token) => {
  return axios.get(`${API_URL}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {
  captainLogin,
  userLogin,
  userSignUp,
  captainSignUp,
  getCaptainProfile,
  getUserProfile,
};
