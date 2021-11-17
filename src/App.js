import './App.module.scss';
import style from './App.module.scss';
import CityList from "./Components/CityList/CityList";
import {Route, Switch, Redirect} from "react-router-dom";

function App() {
    
    return (
        <main className={style.app}>
            <h1 className={style.title}>Weather forecast</h1>
            <Switch>
                <Route exact path='/'>
                    <CityList/>
                </Route>
                <Redirect to='/'/>
            </Switch>
        </main>
    );
}

export default App;
