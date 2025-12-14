import axios from 'axios';

const API_URL = '/api/games';

export const fetchGames = (filters) => {
    return axios.get(API_URL, { params: filters });
};