import React, {Component} from 'react';
import {getStorageData, saveNewData} from '../common/storageData';

class ChangePin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertShow: false,
            alertType: '',
            alertText: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();

        const pins = {
            oldPin: this.refs.oldPin.value,
            newPin: this.refs.newPin.value,
            newPinConfirm: this.refs.newPinConfirm.value,
        };

        if (this.checkOldPin(pins.oldPin) && this.checkNewPin(pins.newPin, pins.newPinConfirm) && this.pinRegexp(pins.newPin)) {
            document.forms[0].reset();
            console.log('PIN has been changed');
            this.setState({alertShow: true, alertType: 'alert-success', alertText: 'PIN was successfully changed!'});
            saveNewData('User', 'pin', pins.newPin);
        } else {
            this.setState({alertShow: true, alertType: 'alert-danger', alertText: 'Invalid PIN! Try again'});
            console.log(this.state.alertShow)
            console.log('Invalid PIN!');
        }
    }

    pinRegexp(newPin) {
        const pattern = /^\d{4}$/;
        return pattern.test(newPin);

    }

    checkOldPin(pin) {
        const userData = getStorageData('User'); //take it from props
        return userData.pin === pin
    }

    checkNewPin(newPin, newPinConfirm) {
        return newPin === newPinConfirm;
    }

    interface() {
        return (
            <div className='row'>
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className='row'>
                        <label htmlFor="atm-changePin-oldPin"><h4>Enter old PIN</h4><input type="text"
                                                                                           id='atm-changePin-oldPin'
                                                                                           className='form-control atm-changePin-pinInput'
                                                                                           ref='oldPin'/></label>
                    </div>
                    <div className='row'>
                        <label htmlFor="atm-changePin-newPin"><h4>Enter new PIN</h4><input type="text"
                                                                                           id='atm-changePin-newPin'
                                                                                           className='form-control atm-changePin-pinInput'
                                                                                           ref='newPin'/></label>
                    </div>
                    <div className='row'>
                        <label htmlFor="atm-changePin-newPinConfirm"><h4>Confirm new PIN</h4><input type="text"
                                                                                                    id='atm-changePin-newPinConfirm'
                                                                                                    className='form-control atm-changePin-pinInput'
                                                                                                    ref='newPinConfirm'/></label>
                    </div>
                    <div className='row'>
                        <input type="submit" value='CONFIRM' className='form-control btn btn-success'/>
                    </div>
                </form>
            </div>

        )
    }


    render() {
        const alertClass = `container alert ${this.state.alertType}`;
        const alert = this.state.alertShow === true ? (<div className={alertClass}>{this.state.alertText}</div>) : '';
        return (
            <div className='container atm-dataBlock'>
                <div className='row'>
                    {alert}
                </div>
                <div className='row'>
                    {this.interface()}
                </div>
            </div>
        )
    }

}

export default ChangePin;