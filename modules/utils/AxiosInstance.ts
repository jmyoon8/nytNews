import axios, { Axios } from "axios";

export const myKey = "EU1xUPhIBMY7pAtW2APtxYHEYcvxe7kH";
export const axiosInstance = axios.create({
  baseURL: `https://api.nytimes.com/svc/search/v2/articlesearch.json`,
});
