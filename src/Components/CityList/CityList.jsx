import React, {useEffect} from 'react';
import {CircularProgress} from "@mui/material";
import CardItem from "../Card/CardItem";
import {useDispatch, useSelector} from "react-redux";
import {getCity} from "../../Redux/city_list_reducer";
import AddNewCardModal from "../modal/addNewCardModal";
import style from './CityList.module.scss'

const CityList = () => {
    const dispatch = useDispatch(),
        cities = useSelector(state => state.cities.cities),
        isFetching = useSelector(state => state.cities.isFetching);
    
    useEffect(() => {
        dispatch(getCity(5128581));
        dispatch(getCity(2759794));
        dispatch(getCity(2950158));
        dispatch(getCity(706483));
    }, []);
    
    return (
        isFetching
            ? <CircularProgress size={100} thickness={5} color='inherit'
                                sx={{position: 'absolute', inset: `${45}% 0 0 ${45}%`, color: '#ffff'}}/>
            : <div className={style.wrapper}>
                <>
                    {cities.map(city => (<div className={style.card} key={city.id}><CardItem city={city}/></div>))}
                    <div className={style.addCard}><AddNewCardModal/></div>
                </>
            </div>
    
    );
};

export default CityList;