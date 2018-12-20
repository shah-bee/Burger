import React from 'react';
import Aux from '../../../hoc/Taher';

const orderSummary = (props) => {
    const ingredientsSummary  = props.ingredients;
    const ingredientsList = Object.keys(props.ingredients)
    .map(igKey => {
        return <li><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {ingredientsSummary[igKey]}</li>
    });

    return (
        <Aux>
            <h3>Order summary!</h3>
            <p>Your delicious burger ready with ingredients:</p>
            <ul>
                {ingredientsList}
            </ul>
        </Aux>
    )

}

export default orderSummary;