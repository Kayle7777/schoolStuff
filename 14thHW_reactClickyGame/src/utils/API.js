import axios from "axios";
const apiKey=process.env.REACT_APP_GIPHY_API_KEY;
export default {
    getImages: (query, limit) => {
        let qstring=`https://api.giphy.com/v1/gifs/search?q=${query || "rick and morty"}&limit=${limit || 15}&rating=g&api_key=${apiKey}`
        return axios.get(qstring);
    }
};
