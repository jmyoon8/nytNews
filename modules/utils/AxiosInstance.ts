import axios from 'axios';

export const myKey = 'EU1xUPhIBMY7pAtW2APtxYHEYcvxe7kH';
export const searchUrl = 'search/v2/articlesearch.json';
export const mostPopularUrl = 'mostpopular/v2/viewed/';
export const axiosInstance = axios.create({
   baseURL: 'https://api.nytimes.com/svc/',
});
