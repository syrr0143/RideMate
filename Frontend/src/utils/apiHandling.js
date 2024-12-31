import axios from "axios";
import { baseUrl } from "../config/Api.js";

const userSignUp = async (userInput) => {
  console.log("baseurl is ", baseUrl);
  return axios.post(`${baseUrl}/user/signup`, userInput);
};

const userLogin = async (credentials) => {
  return axios.post(`${baseUrl}/user/login`, credentials);
};
const generateNewTokenForUser = async (token) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/get-token`,
      {}, // Body of the POST request (empty object since no body is needed)
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // You can return the response data or token here
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Throw the error to be handled by the calling function
  }
};

const captainSignUp = async (captainInput) => {
  return axios.post(`${baseUrl}/captain/signup`, captainInput);
};

const captainLogin = async (credentials) => {
  return axios.post(`${baseUrl}/captain/login`, credentials);
};

const getCaptainProfile = async (token) => {
  return axios.get(`${baseUrl}/captain/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const logoutUser = async (token) => {
  return axios.post(`${baseUrl}/user/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const logoutCaptain = async (token) => {
  return axios.post(`${baseUrl}/captain/logout`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getUserProfile = async (token) => {
  return axios.get(`${baseUrl}/user/profile`, {
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
  generateNewTokenForUser,
  logoutUser,
  logoutCaptain,
};
