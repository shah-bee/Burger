import React from 'react';
import classes from './Button.css';
import Aux from '../../../hoc/Taher';
const button = (props) => {
    return (
        <Aux>
        <button onClick={props.click} className={[classes.Button,classes[props.btnType]].join(' ')}>
        {props.children}
        </button>
        
        </Aux>
    );
}

export default button;