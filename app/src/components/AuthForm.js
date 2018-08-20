import React, {Component} from 'react';
import jwt from 'jsonwebtoken';
import {getStorageData, saveNewData} from '../common/storageData';
import {connect} from "react-redux";
import isGuest from "../common/isGuest";

import {Redirect} from 'react-router-dom';

class AuthForm extends Component {
    constructor(props) {
        super(props);
        this.blockValue = 3;
        this.state = {
            alertShow: false,
            alertType: '',
            alertText: '',
        };
        this.userData = getStorageData('User');
        this.atmData = getStorageData('ATM');
        this.pinCounter = getStorageData('pinCounter');
        this.props.initPIN(this.pinCounter.counter)
    }

    onSubmit(e) {
        e.preventDefault();
        const pinCounter = this.props.pinCounter;
        const currentPin = this.refs.pin.value;
        if (pinCounter === this.blockValue) {

            console.log('ACCESS DENIED!')//alert
        } else {
            if (this.verifyPIN(currentPin)) {
                this.props.goodPIN(pinCounter);
                console.log('good');
                localStorage.setItem('token', jwt.sign({id: currentPin}, 'auth-user', {
                    expiresIn: 900 // 15 min
                }));
                localStorage.setItem('User', JSON.stringify(this.userData));
                localStorage.setItem('ATM', JSON.stringify(this.atmData));
                window.location.href='/'
                this.setState({alertShow: true, alertType:'alert-success', alertText:'Welcome!'});

            } else {
                this.props.badPIN(pinCounter);
                this.setState({alertShow: true, alertType:'alert-danger', alertText:'Invalid PIN!'});
                console.log('bad');
            }
            saveNewData('pinCounter', 'counter', pinCounter);
        }
    }

    verifyPIN(currentPin) {
        console.log('verifying...');
        return currentPin === this.userData.pin;
    }

    interface() {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h1>Welcome!</h1>
                    </div>
                </div>
                <div className='row'>
                    <form onSubmit={e => this.onSubmit(e)}>
                        <div className='col'>
                            <label htmlFor="pinInput">
                                Enter PIN
                                <input ref='pin' id='pinInput' type="text" className='form-control'/>
                            </label>
                        </div>
                        <div className='col'>
                            <input type="submit" className='form-control btn btn-success' value='SUBMIT'/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    // redirectToMenu() {
    //
    // }

    render() {
        const alertClass = `container alert ${this.state.alertType}`;
        const alert = this.state.alertShow === true ? (<div className={alertClass}>{this.state.alertText}</div>) : '';
        return (
            <div className='row'>
                {alert}
                {!!isGuest() ? this.interface() : ''}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        pinCounter: state.pinCounter
    }
};

const mapDispatchToProps = dispatch => {
    return {
        initPIN: (payload) => dispatch({
            type: 'INIT_PIN',
            payload
        }),
        badPIN: (payload) => dispatch({
            type: 'BAD_PIN',
            payload
        }),
        goodPIN: (payload) => dispatch({
            type: 'GOOD_PIN',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthForm);

