import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolBar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <div>Menu</div>
           <Logo></Logo>
            <nav className={classes.DesktopOnly}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    );
}

export default toolBar;