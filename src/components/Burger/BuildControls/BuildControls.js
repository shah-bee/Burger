import React from 'react';
import classes from './BuildControls.css';
import BuildControl from '../BuildControl/BuildControl';
import Aux from '../../../hoc/Taher';
const buildControls = (props) => {
    const buildControls = [
        { label: 'Cheese', type: 'cheese' },
        { label: 'Salad', type: 'salad' },
        { label: 'Meat', type: 'meat' }
    ];

    let controls = buildControls.map(ctrl => {
        return <BuildControl type={ctrl.type} label={ctrl.label} key={ctrl.type}
            addIngredient={() => props.addIngredient(ctrl.type)}
            removeIngredient={() => props.removeIngredient(ctrl.type)} disable={props.disabledInfo[ctrl.type]} ></BuildControl>
    });
    return (
        <Aux>
            <div className={classes.BuildControls}>
                <p>Total Price: <strong>{props.totalPrice.toFixed(2)}</strong></p>
                {controls}
                <button className={classes.OrderButton}
                onClick={props.OrderSummary}
                disabled={!props.placeOrder}>Order Now</button>
            </div>

        </Aux>
    )
}

export default buildControls;