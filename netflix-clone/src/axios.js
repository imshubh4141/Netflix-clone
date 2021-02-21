import axios from "axios";

// base url to make requests to the movie database
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US

export default instance;

