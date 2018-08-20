import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import Home from './components/Home';
// import WelcomePage from "./components/WelcomePage";
import Balance from "./components/Balance";
import ChangePin from "./components/ChangePin";
import Payout from "./components/Payout";
import AuthForm from "./components/AuthForm";

const history = createBrowserHistory();
const store = createStore(rootReducer);
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path='/' component={Home}/>
                <Route path='/auth' component={AuthForm}/>
                <Route path='/balance' component={Balance}/>
                <Route path='/changePin' component={ChangePin}/>
                <Route path='/payout' component={Payout}/>
            </div>
        </Router>
    </Provider>, document.getElementById('root'));

