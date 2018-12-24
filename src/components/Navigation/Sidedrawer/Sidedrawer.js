import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import classes from './Sidedrawer.css';

const sidedrawer = (props) => {

    return (
        <div className={classes.Sidedrawer}>
            <div className={classes.Logo}>
                <Logo />
            </div>
            <nav>
                <NavigationItems></NavigationItems>
            </nav>
        </div>
    )

}

export default sidedrawer;