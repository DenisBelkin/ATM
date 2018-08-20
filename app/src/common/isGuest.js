import React from 'react';
import {Redirect} from 'react-router-dom';

const isGuest = () => {
    const token = localStorage.getItem('token');
    const isTokenExist = !!token;
    if (isTokenExist) {
        return false;
    } else {
        return (
            <div>
                <Redirect to='/auth'/>
            </div>
        );
    }
};
export default isGuest;