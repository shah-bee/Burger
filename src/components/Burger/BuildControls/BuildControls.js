import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControl/BuildControl';
const buildControls =  (props) => {
    const buildControls = [
        { label : 'Cheese' , type: 'cheese'},
        { label : 'Salad' , type: 'salad'},
        { label : 'Meat' , type: 'meat'}
    ];

    let controls = buildControls.map(ctrl => {
       return <BuildControl type={ctrl.type} label={ctrl.label}></BuildControl>
    });
    return(
        <div>
            {controls}
        </div>
    )
}

export default buildControls;