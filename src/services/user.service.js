import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

// Define the function for public content
const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

// Define the function for user board
const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

// Define the function for moderator board
const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

// Define the function for admin board
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

// Assign the object to a variable
const userService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default userService;
