import React from 'react';
import classes from './BackDrop.css';

const backDrop = (props) => {
    return (
           props.show ? <div className={classes.Backdrop} onClick={props.cancel}></div>
           : null
    );
}

export default backDrop;