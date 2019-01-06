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

    componentDidUpdate() {
        console.log(this.props, "Burger builder did update");
    }

    continuePurchaseHandler = () => {
        this.props.history.push('/burger/checkout');
        this.setState({
            loading: false,
            purchasing: false
        });
        return;

        this.setState({
            loading: true
        });
        let order = {
            Ingredients: this.state.ingredients,
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

        let order = <OrderSummary ingredients={this.props.ingredients} {...this.props}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            totalPrice={this.props.price}
        ></OrderSummary>
        if (this.state.loading) {
            order = <Spinner></Spinner>
        }

        let burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls addIngredient={(value) => this.props.onAddIngredient(value)}
                    removeIngredient={(value) => this.props.onRemoveIngredient(value)} disabledInfo={disabledInfo}
                    totalPrice={this.props.price}
                    placeOrder={this.updatePurchaseState(this.props.ingredients)}
                    OrderSummary={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        );
        if (!this.props.ingredients) {
            burger = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    {this.props.ingredients ? order : null}
                </Modal>
                {burger}
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