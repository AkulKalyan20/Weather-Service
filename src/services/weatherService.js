import axios from 'axios';
import { WEATHER_API_CONFIG } from '../config';

const { apiKey, baseUrl, units } = WEATHER_API_CONFIG;

export const getWeather = async (city) => {
    try {
        const response = await axios.get(`${baseUrl}/weather`, {
            params: {
                q: city,
                appid: apiKey,
                units: units
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch weather data');
    }
};

export const getHistoricalWeather = async (city) => {
    try {
        const response = await axios.get(`${baseUrl}/onecall/timemachine`, {
            params: {
                q: city,
                appid: apiKey,
                units: units,
                dt: Math.floor(Date.now() / 1000) - 86400 // 24 hours ago
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch historical weather data');
    }
};
