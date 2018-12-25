import React from 'react';
import classes from './DrawerToggle.css';

const menu = (props) => {
    return (
        <div className={classes.DrawerToggle} onClick={props.toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default menu;