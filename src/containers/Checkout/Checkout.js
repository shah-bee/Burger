import React, {Component} from 'react';
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {
    state={
        ingredients: {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        }
    }

    render(){
        return(
            <CheckoutSummary ingredients={this.state.ingredients}></CheckoutSummary>
        )
    }
}

export default Checkout;