import React from 'react';
import classes from './BuildControl.css';

const buildControl = (props) => {

    return (
        <div className={classes.BuildControl}>
            <p className={classes.Label}>{props.label}</p>
            <button className={classes.Less} onClick={props.removeIngredient} 
            disabled={props.disable} >Less</button>
            <button className={classes.More} onClick={props.addIngredient}>More</button>
        </div>
    )
}

export default buildControl;