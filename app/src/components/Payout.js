import React, {Component} from 'react';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';

import {mapDispatchToProps, mapStateToProps} from "../reducers/balanceDispatchers";
import {saveNewData} from "../common/storageData";

import '../css/Payout.css'

class Payout extends Component {
    constructor(props) {
        super(props);
        this.isPayed = false;
        this.state = {
            alertShow: false,
            alertType: '',
            alertText: '',
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.decreaseBalance();
        console.log('done')

    }


    decreaseBalance() {
        const moneyToOut = this.refs.output.value;

        if (this.props.atmBalance - moneyToOut < 0) {
            console.log('ATM hasn\'t enough money. Try again')//alert
            this.setState({
                alertShow: true,
                alertType: 'alert-danger',
                alertText: 'ATM hasn\'t enough money. Try again'
            });
        } else if (this.props.userBalance - moneyToOut < 0) {
            console.log('You haven\'t enough money. Try again')//alert
            this.setState({
                alertShow: true,
                alertType: 'alert-danger',
                alertText: 'You haven\'t enough money. Try again'
            });
        } else if (moneyToOut % 10 !== 0) {
            console.log('Invalid value! Value has to be multiple to 10')
            this.setState({
                alertShow: true,
                alertType: 'alert-danger',
                alertText: 'Invalid value! Value has to be multiple to 10'
            });
        } else {
            document.forms[0].reset();
          //  this.setState({alertShow: true, alertType: 'alert-success', alertText: 'Success!'});
            this.props.decreaseAtmBalance(moneyToOut);
            this.isPayed = true;
            this.props.decreaseUserBalance(moneyToOut);
        }
    }

    interface() {
        const alert = this.state.success === false ? (
            <div className="container alert alert-danger">Invaid value. Try again</div>) : '';
        return (
            <div className='row'>
                {alert}
                <form onSubmit={e => this.handleSubmit(e)}>
                    <div className='row'><label htmlFor="atm-moneyToOut"><h4>Enter the value to out</h4><input
                        type="number" ref='output'
                        id='atm-moneyToOut'
                        className='form-control'/></label></div>

                    <div className='row'><input type="submit" value='CONFIRM'
                                                className='form-control btn btn-success'/></div>

                </form>
            </div>
        )
    }


    redirectToBalance() {
        return <Redirect to='/balance'/>
    }

    render() {
        const alertClass = `container alert ${this.state.alertType}`;
        const alert = this.state.alertShow === true ? (<div className={alertClass}>{this.state.alertText}</div>) : '';
        return (
            <div className='container atm-dataBlock'>
                <div className='row'>
                    {alert}
                </div>
                {this.isPayed ? this.redirectToBalance() : ''}
                    {this.interface()}

            </div>
        )
    }

}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Payout);
