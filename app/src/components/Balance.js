import React, {Component} from 'react';
import {connect} from "react-redux";

import {mapDispatchToProps, mapStateToProps} from "../reducers/balanceDispatchers";

import '../css/Balance.css';

class Balance extends Component{
    constructor(props){
        super(props);
    }

    showBalance(){
      //  const userData = JSON.parse(localStorage.getItem('User'));

        return (
            <div className='row'>
                <div className='col'>
                    <h1>Your current balance is: {this.props.userBalance}$</h1>
                </div>
            </div>
        )
    }

    render(){
        return (
            <div className='container atm-dataBlock' id='atm-userBalance'>
                {this.showBalance()}
            </div>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Balance);