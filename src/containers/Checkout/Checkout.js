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

    cancelCheckoutHandler =() => {
        this.props.history.goBack();
    }
    continueCheckoutHandler = () => {
        this.props.history.push('/burger/contact-data');
    }
    render(){
        return(
            <CheckoutSummary ingredients={this.state.ingredients}
            cancel={this.cancelCheckoutHandler}
            continue={this.continueCheckoutHandler}
            ></CheckoutSummary>
        )
    }
}

export default Checkout;