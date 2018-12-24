import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Menu from '../Sidedrawer/DrawerToggle/DrawerToggle';

const toolBar = (props) => {
    return(
        <header className={classes.Toolbar}>
            <Menu toggleMenu={props.show}>Menu</Menu>
           <Logo></Logo>
            <nav className={classes.DesktopOnly}>
                <NavigationItems></NavigationItems>
            </nav>
        </header>
    );
}

export default toolBar;