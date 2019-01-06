import React, { Component } from 'react';
import CheckoutSummary from '../../components/Burger/CheckoutSummary/CheckoutSummary'
import {connect} from 'react-redux'

class Checkout extends Component {
    cancelCheckoutHandler = () => {
        this.props.history.goBack();
    }
    continueCheckoutHandler = () => {
        this.props.history.push('/burger/contact-data');
    }
    render() {
        return (
            <CheckoutSummary ingredients={this.props.ingredients}
                cancel={this.cancelCheckoutHandler}
                continue={this.continueCheckoutHandler}
            ></CheckoutSummary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);