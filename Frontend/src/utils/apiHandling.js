import axios from "axios";
const baseurl = import.meta.env.VITE_API_URL;

const userSignUp = async (userInput) => {
  console.log("baseurl is ", baseurl);
  return axios.post(`${baseurl}/user/signup`, userInput);
};

const userLogin = async (credentials) => {
  return axios.post(`${baseurl}/user/login`, credentials);
};
const generateNewTokenForUser = async (token) => {
  try {
    const response = await axios.post(
      `${baseurl}/user/get-token`,
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
  return axios.post(`${baseurl}/captain/signup`, captainInput);
};

const captainLogin = async (credentials) => {
  return axios.post(`${baseurl}/captain/login`, credentials);
};

const getCaptainProfile = async (token) => {
  return axios.get(`${baseurl}/captain/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
const getUserProfile = async (token) => {
  return axios.get(`${baseurl}/user/profile`, {
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
};
