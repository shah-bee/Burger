import React from 'react';
import Button from '../../../UI/Button/Button';

const order = (props) => {

    return (
        <div>
            <form onSubmit={props.submit}>
                <input type="text" name="name" placeholder="Your name"></input>
                <input type="email" name="email" placeholder="Email address"></input>
                <input type="text" name="postalcode" placeholder="Postal code"></input>
                <Button btnType="Sucsess" click="">Order</Button>
            </form>
        </div>
    )
}

export default order;