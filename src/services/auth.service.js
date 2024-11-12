import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

// Define the register function
const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

// Define the login function
const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Define the logout function
const logout = () => {
  localStorage.removeItem("user");
};

// Assign the object to a variable
const authService = {
  register,
  login,
  logout,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default authService;
