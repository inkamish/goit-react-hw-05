import axios from "axios";

const API_KEY = "4e090bc10d39a7cd423941a9fddf4f4a";
const BASE_URL = "https://api.themoviedb.org/3";

// Загальна функція для запитів
const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        ...params,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const getTrendingMovies = () => fetchData("/trending/movie/day");

const getMovieByName = (text) => fetchData("/search/movie", { query: text });

const getMovieById = (id) => fetchData(`/movie/${id}`);

const getCredits = (id) => fetchData(`/movie/${id}/credits`);

const getReviews = (id) => fetchData(`/movie/${id}/reviews`);

export {
  getTrendingMovies,
  getMovieByName,
  getMovieById,
  getCredits,
  getReviews,
};
