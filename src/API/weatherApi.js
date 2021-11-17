import axiosInstance from "./axiosInstance";

const API_KEY = '4b7c90762237282b15b2b9f3ae36eec5';

const WeatherApi = {
    getCities: (cityID) => {
        return axiosInstance.get(`weather?id=${cityID}&units=metric&appid=${API_KEY}`)
    },
    getNewCityName: (text) => {
        return axiosInstance.get(`weather?q=${text}&units=metric&appid=${API_KEY}`)
    },
    getHourlyForecast: (lat, lon) => {
        return axiosInstance.get(`onecall?lat=${lat}&lon=${lon}&exclude=minutely,daily&units=metric&appid=${API_KEY}`)
    }
};

export default WeatherApi;