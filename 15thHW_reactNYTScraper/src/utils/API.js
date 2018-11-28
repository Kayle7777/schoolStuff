import axios from "axios";
const apiURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
const apiKey = process.env.REACT_APP_NYT_API_KEY;


export default {
    search: function(query) {
        return axios.get(`${apiURL}${query}&api-key=${apiKey}`);
    }
};
