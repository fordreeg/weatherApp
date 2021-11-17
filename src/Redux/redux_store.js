import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import cityListReducer from "./city_list_reducer";
import thunk from "redux-thunk";

const reducers = combineReducers({
    cities: cityListReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));