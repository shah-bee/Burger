import React from 'react';
import classes from './Logo.css';
import Logo from '../../../assets/burger-logo.png';

const logo = (props) => {
    return (
        <div className={classes.Logo}>
            <img src={Logo}></img>
        </div>
    )
}

export default logo;