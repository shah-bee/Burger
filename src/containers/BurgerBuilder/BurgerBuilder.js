import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Taher';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import AxiosOrder from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { Route, withRouter } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';


class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        canPlaceOrder: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const selectedIngredientCount = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, curr) => {
            return sum + curr;
        }, 0);

        return selectedIngredientCount > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    continuePurchaseHandler = () => {
        this.setState({
            loading: true
        });
        let order = {
            Ingredients: this.props.ingredients,
            Price: this.props.price,
            Customer: {
                Name: "Mohammed Shah",
                Address: "H.No 1/671, Jeerangi Gadde",
                Street: "Test street 1",
                email: "mr.shah.taher@gmail.com"
            },
            deliveryMethod: "fastest"
        }
        AxiosOrder.post('/orders.json', order).then(response => {
            this.setState({
                loading: false,
                purchasing: false
            });
        });
        // alert('Continue purchase...');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let order = <OrderSummary ingredients={this.props.ingredients}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            totalPrice={this.props.price}
        ></OrderSummary>
        if (this.state.loading) {
            order = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls addIngredient={(value) => this.props.onAddIngredient(value)}
                    removeIngredient={(value) => this.props.onRemoveIngredient(value)} disabledInfo={disabledInfo}
                    totalPrice={this.props.price}
                    placeOrder={this.updatePurchaseState(this.props.ingredients)}
                    OrderSummary={this.purchaseHandler}
                ></BuildControls>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    {order}
                </Modal>
            </Aux>
        );
    }
}
    

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (value) => dispatch(actionCreator.addIngredient(value)),
        onRemoveIngredient: (value) => dispatch(actionCreator.removeIngredient(value)),
    }
}

export default WithErrorHandler(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder), AxiosOrder);
