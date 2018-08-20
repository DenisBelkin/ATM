import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from "react-redux";

import {mapDispatchToProps, mapStateToProps} from "../reducers/balanceDispatchers";
import isGuest from '../common/isGuest';
import {getStorageData} from "../common/storageData";
import Alerts from './Alerts';

import '../css/Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            alertType: '',
            alertText: '',
        };

    }

    logOut(e) {
        e.preventDefault();
        localStorage.removeItem('token');
        this.setState({
            alertShow: true,
            alertType: 'alert-warning',
            alertText: 'Bye!'
        });
        this.redirectToAuth()
    }

    redirectToAuth() {
        window.location.reload();
    }

    mainMenu() {
        return (
            <div className='mainMenu container'>
                <div className='row'>
                    <div className='col'>
                        <NavLink to="/balance">
                            <button className='btn atm-btn-menu btn-warning'>Balance</button>
                        </NavLink>
                    </div>
                    <div className='col'>
                        <NavLink to="/changePin">
                            <button className='btn atm-btn-menu btn-warning'>Change PIN</button>
                        </NavLink>
                    </div>
                    <div className='col'>
                        <NavLink to="/payout">
                            <button className='btn atm-btn-menu btn-warning'>Payout</button>
                        </NavLink>
                    </div>
                    <div className='col'>
                        <button onClick={e => this.logOut(e)} className='btn atm-btn-menu btn-danger'>Log out</button>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const atmBalance = getStorageData('ATM');
        const userBalance = getStorageData('User');
        this.props.initAtmBalance(atmBalance.money);
        this.props.initUserBalance(userBalance.money);
        const checkingIsGuest = !!isGuest();


        const alertClass = `container alert ${this.state.alertType}`;
        const alert = this.state.alertShow === true ? (<div className={alertClass}>{this.state.alertText}</div>) : '';
        return (
            <div>
                <div className='row'>
                    {alert}
                </div>
                <div>
                    {checkingIsGuest ? isGuest() : this.mainMenu()}
                </div>
            </div>
        )
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);

// export default Home;
