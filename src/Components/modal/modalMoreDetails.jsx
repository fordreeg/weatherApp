import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useTheme} from '@mui/material/styles';
import {useDispatch, useSelector} from "react-redux";
import {resetHourlyForecast, uploadHourlyForecast} from "../../Redux/city_list_reducer";
import style from './modalMoreDetails.module.scss';
import {Box, CircularProgress} from "@mui/material";
import {useState} from "react";

export default function ModalMoreDetails({updateInProgress, ...props}) {
    const dispatch = useDispatch(),
        hourlyForecast = useSelector(state => state.cities.hourlyForecast),
        [open, setOpen] = useState(false);
    
    
    const theme = useTheme(),
        fullScreen = useMediaQuery(theme.breakpoints.down('md')),
        weatherIcon = `http://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`;
    
    let identLeftHourlyForecastItem = 0;
    
    const handleClickOpen = () => {
        setOpen(true);
        dispatch(uploadHourlyForecast(props.city.coord.lat, props.city.coord.lon));
    };
    
    const handleClose = () => {
        dispatch(resetHourlyForecast());
        setOpen(false);
    };
    return (
        <div>
            <Button variant="outlined" color="inherit" disabled={updateInProgress}
                    sx={{
                        color: '#ffff',
                        borderColor: '#bfbfbf',
                    }}
                    onClick={handleClickOpen}> More details </Button>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}
                    sx={{'.MuiPaper-root': {
                            backgroundColor: 'rgba(0, 0, 0, .4)',
                            backdropFilter: 'blur(7px)',
                        },}}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title" className={style.title}>
                    <div><p>{props.dateTime}</p>{props.city.name}, {props.city.sys.country}</div>
                    <button className={style.btnClose} onClick={handleClose}>&#10006;</button>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText className={style.tempWrapper}>
                        <img className={style.weatherIcon} src={weatherIcon} alt='weather icon'/>
                        <span className={style.temp}>{Math.round(props.city.main.temp)}&deg;C</span>
                    </DialogContentText>
                    <div className={style.forecast}>
                        <div>Feels like: {Math.round(props.city.main.feels_like)}&deg;C.</div>
                        <div>Minimum temperature at the moment : {Math.round(props.city.main.temp_min)}&deg;C.</div>
                        <div>Maximum temperature at the moment : {Math.round(props.city.main.temp_max)}&deg;C.</div>
                        <div>{props.city.weather[0].main}: {props.city.weather[0].description}.</div>
                        {props.city.clouds && <div>Cloudiness : {Math.round(props.city.clouds.all)} %.</div>}
                        {props.city.main.pressur && <div>Atmospheric pressure : {props.city.main.pressure}hPa.</div>}
                        {props.city.main.humidity && <div>Humidity: {props.city.main.humidity}%. </div>}
                        {props.city.wind.speed && <div>Wind speed : {Math.round(props.city.wind.speed)} m/s.</div>}
                        {props.city.rain && <div>Rain volume for the last 1 hour : {props.city.rain["1h"]} mm.</div>}
                        {props.city.rain && <div>Rain volume for the last 3 hours : {props.city.rain["3h"]} mm.</div>}
                        {props.city.snow && <div>Snow volume for the last 1 hour : {props.city.snow["1h"]} mm.</div>}
                        {props.city.snow && <div>Snow volume for the last 3 hours : {props.city.snow["3h"]} mm.</div>}
                    </div>
                </DialogContent>
                <div className={style.hourlyForecast}>
                    {
                        !hourlyForecast
                            ? <CircularProgress color='inherit' sx={{color: '#ffff'}}/>
                            : hourlyForecast.map((item, index) => {
                                identLeftHourlyForecastItem += 33;
                                return (
                                    <HourlyForecastItem temp={item.temp} key={index}
                                                        icon={item.icon}
                                                        time={item.time}
                                                        identLeft={identLeftHourlyForecastItem}/>
                                )
                            })
                    }
                </div>
            </Dialog>
        </div>
    );
}

const HourlyForecastItem = ({temp, identLeft, icon, time}) => {
    
    const identL = identLeft === 33 ? 0 : identLeft-33,
        temperature = temp > 0 ? '+'+temp : temp,
        weatherIcon = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    
    let color = '#ff0000';

    if (temp >= 25) {
        color = 'rgba(248,255,0,0.9)';
    } else if (temp >= 20) {
        color = 'rgba(251,255,90,0.9)';
    } else if (temp >= 15) {
        color = 'rgba(252,255,117,0.9)';
    } else if (temp >= 10) {
        color = 'rgba(242,245,163,0.9)';
    } else if (temp >= 5) {
        color = 'rgba(160,222,248,0.9)';
    } else if (temp >= 0) {
        color = 'rgba(125,186,248,0.9)';
    } else if (temp >= -5) {
        color = 'rgba(90,169,248,0.9)';
    } else if (temp >= -10) {
        color = 'rgba(73,163,255,0.9)';
    } else if (temp >= -15) {
        color = 'rgba(50,151,255,0.9)';
    } else if (temp >= -20) {
        color = 'rgba(28,140,255,0.9)';
    } else if (temp >= -25) {
        color = 'rgba(0,116,219,0.9)';
    }
    
    return (
        <>
            <Box className={style.hourlyForecast__item} sx={{
                top: `calc(50% - ${temp}%)`,
                left: identL+'px',
                backgroundColor: color,
            }}>{temperature}</Box>
            <img className={style.hourlyForecast__icon} src={weatherIcon}
                 style={{top: `calc(50% - ${temp +13}%)`, left: identL+'px'}}
                 alt="icon"/>
            <span className={style.hourlyForecast__time} style={{left: identL+'px'}}>
                {time}
            </span>
        </>
    )
}