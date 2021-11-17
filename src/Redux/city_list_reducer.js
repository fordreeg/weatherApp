import WeatherApi from "../API/weatherApi";
import timeConverter from "../utils/convertTimestamp";

const SET_FORECAST_CITIES = 'SET_FORECAST_CITIES',
    SET_DEFAULT_FORECAST_CITIES = 'SET_DEFAULT_FORECAST_CITIES',
    IS_FETCHING = 'IS_FETCHING',
    IS_UPDATE = 'IS_UPDATE',
    UPDATE_FORECAST_CITY = 'UPDATE_FORECAST_CITY',
    SET_NEW_CITY_NAME = 'SET_NEW_CITY_NAME',
    SET_ERROR = 'SET_ERROR',
    UPLOAD_HOURLY_FORECAST = 'UPLOAD_HOURLY_FORECAST',
    RESET_HOURLY_FORECAST = 'RESET_HOURLY_FORECAST',
    HIDDEN_IDENTICAL_CITY = 'HIDDEN_IDENTICAL_CITY',
    REMOVE_CITY = 'REMOVE_CITY';

const initialState = {
    cities: [],
    isFetching: null,
    isUpdate: [],
    isIdenticalCity: false,
    newCityName: '',
    hourlyForecast: null,
};
export default function cityListReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FORECAST_CITIES:
            const identicalCities = state.cities.some(city => city.id === action.cityData.id);
            
            if (identicalCities) {
                return {
                    ...state,
                    isIdenticalCity: true,
                    newCityName: '',
                }
            } else {
                return {
                    ...state,
                    cities: [...state.cities, action.cityData],
                    newCityName: '',
                    isIdenticalCity: false,
                }
            }
        case HIDDEN_IDENTICAL_CITY:
            return {
                ...state,
                isIdenticalCity: false
            }
        case SET_DEFAULT_FORECAST_CITIES:
            return {
                ...state,
                cities: [...state.cities, action.cityData]
            }
        case UPDATE_FORECAST_CITY:
            return {
                ...state,
                cities: state.cities.map(city => {
                    if (city.id === action.cityData.id) {
                        return {...city, ...action.cityData}
                    }
                    return city
                })
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.error
            }
        case UPLOAD_HOURLY_FORECAST:
            return {
                ...state,
                hourlyForecast: [...action.hourlyForecas]
            }
        case RESET_HOURLY_FORECAST:
            return {
                ...state,
                hourlyForecast: null
            }
        case REMOVE_CITY:
            return {
                ...state,
                cities: state.cities.filter(city => city.id !== action.cityID.id)
            }
        case SET_NEW_CITY_NAME:
            return {
                ...state,
                newCityName: action.text
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case IS_UPDATE:
            return {
                ...state,
                isUpdate: action.isUpdate
                    ? [...state.isUpdate, action.cityID]
                    : state.isUpdate.filter(id => id !== action.cityID)
            }
        default:
            return state;
    }
}

export const setForecastCityAC = (cityData) => ({type: SET_FORECAST_CITIES, cityData});
export const setDefaultForecastCityAC = (cityData) => ({type: SET_DEFAULT_FORECAST_CITIES, cityData});
export const setNewCityNameAC = (text) => ({type: SET_NEW_CITY_NAME, text});
export const setErrorAC = (error) => ({type: SET_NEW_CITY_NAME, error});
export const updateForecastCityAC = (cityData) => ({type: UPDATE_FORECAST_CITY, cityData});
export const toggleFetchingAC = (isFetching) => ({type: IS_FETCHING, isFetching});
export const updateInProgressAC = (cityID, isUpdate) => ({type: IS_UPDATE, cityID, isUpdate});
export const uploadHourlyForecastAC = (hourlyForecas) => ({type: UPLOAD_HOURLY_FORECAST, hourlyForecas});
export const removeCityAC = (cityID) => ({type: REMOVE_CITY, cityID});
export const resetHourlyForecastAC = () => ({type: RESET_HOURLY_FORECAST});
export const hiddenIdenticalCityAC = () => ({type: HIDDEN_IDENTICAL_CITY});

export const getCity = (cityID) => async (dispatch) => {
    dispatch(toggleFetchingAC(true));
    let response = await WeatherApi.getCities(cityID)
    dispatch(setDefaultForecastCityAC(response.data));
    dispatch(toggleFetchingAC(false));
    
}
export const updateForecastCity = (cityID) => async (dispatch) => {
    dispatch(updateInProgressAC(cityID, true))
    let response = await WeatherApi.getCities(cityID);
    dispatch(updateForecastCityAC(response.data))
    dispatch(updateInProgressAC(cityID, false))
}

export const removeCity = (cityID) => async (dispatch) => {
    dispatch(removeCityAC(JSON.parse(localStorage.getItem(cityID))))
    dispatch(removeCityAC(cityID))
}

export const setNewCityName = (text) => async (dispatch) => {
    dispatch(setNewCityNameAC(text))
}

export const getNewCity = (text) => async (dispatch) => {
    let response = await WeatherApi.getNewCityName(text);
    if (response.statusText === 'OK') {
        dispatch(setForecastCityAC(response.data));
        return response.data.status
    } else {
        return response.data.statusText
    }
    
}

export const uploadHourlyForecast = (lat, lon) => async (dispatch) => {
    let response = await WeatherApi.getHourlyForecast(lat, lon);
    if (response.statusText === 'OK') {
        const hourlyForecast = response.data.hourly
            .splice(0, 12)
            .map(key => {
                const hours = timeConverter(key.dt, true);
                return {time: hours, temp: Math.round(key.temp), icon: key.weather[0].icon}
            });
    
        dispatch(uploadHourlyForecastAC(hourlyForecast));
    }
}

export const resetHourlyForecast = () => (dispatch) => {
    dispatch(resetHourlyForecastAC())
}

export const hiddenIdenticalCityError = () => (dispatch) => {
    dispatch(hiddenIdenticalCityAC())
}


