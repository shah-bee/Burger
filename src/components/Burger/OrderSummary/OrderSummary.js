import React from 'react';
import Aux from '../../../hoc/Taher';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientsSummary  = props.ingredients;
    const ingredientsList = Object.keys(props.ingredients)
    .map(igKey => {
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>
        {igKey}</span> : {ingredientsSummary[igKey]}</li>
    });

    return (
        <Aux>
            <h3>Order summary!</h3>
            <p>Your delicious burger ready with ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
            <p><strong>Total Price: {props.totalPrice}</strong></p>
            <Button btnType="Danger" click={props.cancel}>CANCEL</Button>
            <Button btnType="Success" click={props.continue}>CONTINUE</Button>
        </Aux>
    )

}

export default orderSummary;