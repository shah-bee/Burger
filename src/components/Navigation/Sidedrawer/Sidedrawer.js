import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../Logo/Logo';
import classes from './Sidedrawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Auxilary/Taher';
const sidedrawer = (props) => {
    let attachedClasses = [classes.Sidedrawer,classes.Close];
    if(props.open){
        attachedClasses =  [classes.Sidedrawer, classes.Open]
    }
    return (
        <Aux>
            <BackDrop show={props.open} cancel={props.close}></BackDrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </Aux>
    )

}

export default sidedrawer;