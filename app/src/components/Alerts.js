import React, {Component} from 'react';
import {connect} from "react-redux";


// import 'bootstrap/dist/css/bootstrap.css';
// import {Alert, Button} from 'react-bootstrap';


// import '../css/alert.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

class Alerts extends Component {
    constructor(props) {
        super(props);

      // this.handleDismiss = this.handleDismiss.bind(this);
    }

    // handleDismiss() {
    //     this.props.toggleAlert({show: false});
    // }

    componentDidMount() {
        if (this.props.show) {
            this.props.toggleAlert({key:'show',value:true});
        }
    }

    render() {
    this.props.alert.show = true;
        const alertClass = `alert-${this.props.alert.type}`;
        if (this.props.alert.show) {
            return (
                <div className={alertClass} id='myAlert'>
                    <h4>{this.props.alert.tittle}</h4>
                    {/*<button className='alertCloseBtn' onClick={this.handleDismiss}>X</button>*/}
                </div>
            );
        } else {
            return ''
        }
    }
}

const mapStateToProps = state => {
    return {
        alert: state.alert
    }
};

const mapDispatchToProps = dispatch => {
    return {
        toggleAlert: (payload) => dispatch({
            type: 'TOGGLE_ALERT',
            payload
        })
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Alerts);