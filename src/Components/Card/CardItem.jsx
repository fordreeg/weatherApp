import ModalMoreDetails from "../modal/modalMoreDetails";
import style from './CardItem.module.scss'
import {CircularProgress, Divider, IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import {useDispatch, useSelector} from "react-redux";
import {removeCity, updateForecastCity} from "../../Redux/city_list_reducer";
import timeConverter from "../../utils/convertTimestamp";

const CardItem = (props) => {
    const weatherIcon = `http://openweathermap.org/img/wn/${props.city.weather[0].icon}@2x.png`,
        weather = props.city.weather[0].description && props.city.weather[0].description[0].toUpperCase() + props.city.weather[0].description.slice(1),
        dispatch = useDispatch(),
        isUpdate = useSelector(state => state.cities.isUpdate),
        dateTime = timeConverter(props.city.dt);
    
    const onUpdateForecastCity = (cityID) => {
        dispatch(updateForecastCity(cityID));
    }
    
    const onDeleteCity = (cityID) => {
        dispatch(removeCity(cityID));
    }
    
    const updateInProgress = isUpdate.some(id => id === props.city.id);

    return (
        <>
            <div className={style.wrapper}>
                {updateInProgress
                    ? <div className={style.loader}>
                        <CircularProgress color='inherit' sx={{color: '#ffff'}}/>
                     </div>
                    : <>
                        <div className={style.dateTime}>{dateTime}</div>
                        <div className={style.head}>{props.city.name}, {props.city.sys.country}</div>
                        <div className={style.body}>
                            <img src={weatherIcon} alt='weather icon'/>
                            <p>{Math.round(props.city.main.temp)}&deg;C</p>
                        </div>
                        <div className={style.footer}>
                            Feels like {Math.round(props.city.main.feels_like)}&deg;C. {weather}.
                        </div>
                    </>
                }
            </div>
            <Divider sx={{borderColor: '#bfbfbf'}}/>
            <div className={style.btns}>
                <ModalMoreDetails updateInProgress={updateInProgress} city={props.city} dateTime={dateTime}/>
                <Buttons onDeleteCity={onDeleteCity} id={props.city.id}
                         onUpdateForecastCity={onUpdateForecastCity}
                         updateInProgress={updateInProgress}/>
            </div>
        </>
    )
};
export default CardItem;

const Buttons = (props) => {
    return (
        <div>
            <Tooltip title="Delete" placement="top">
                <IconButton aria-label="delete"
                            onClick={() => {props.onDeleteCity(props.id)}}
                            disabled={props.updateInProgress}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Update" placement="top">
                <IconButton aria-label="update"
                            onClick={() => {props.onUpdateForecastCity(props.id)}}
                            disabled={props.updateInProgress}>
                    <RefreshIcon/>
                </IconButton>
            </Tooltip>
        </div>
    )
}
