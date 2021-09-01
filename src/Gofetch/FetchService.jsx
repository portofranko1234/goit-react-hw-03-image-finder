import axios from "axios";

const API_BASIC_URL = "https://pixabay.com/api/";
const API_KEY = "22486349-475ac57b79bf68bd3ecb1002b";
const TYPE = "photo";
const ORIENTATION = "horizontal";
const PERPAGE = 12;

export const get = (words, page) => {
  return axios.get(
    `${API_BASIC_URL}?key=${API_KEY}&q=${words}&image_type=${TYPE}&page=${page}&orientation=${ORIENTATION}&per_page=${PERPAGE}`
  );
};
