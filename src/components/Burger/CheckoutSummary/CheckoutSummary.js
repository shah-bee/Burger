import React from 'react';
import Burger from '../Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {


    return (
        <div className={classes.CheckoutSummary}>
        <h1>Order summary</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients}></Burger>
            
                <Button btnType="Danger" click={() => "test"} >CANCEL</Button>
                <Button btnType="Success" click={() => "test"}>CONTINUE</Button>
            </div>
        </div>
    )

}

export default checkoutSummary;