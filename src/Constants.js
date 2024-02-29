import axios from "axios";

const BASE_URL = "https://ec2-52-66-238-185.ap-south-1.compute.amazonaws.com/8080";

const token = sessionStorage.getItem("jwtToken");

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});