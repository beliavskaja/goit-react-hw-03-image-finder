import axios from 'axios';

const BASE_URL = "https://pixabay.com/api";
const API_KEY = "24444967-1ec36e6022e36a623505c4c9a";

const fetchImages = (searchImages, page) => {
  return axios.get(`${BASE_URL}/?q=${searchImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
};

export default fetchImages;