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
import * as actionTypes from '../../store/actions';


const INGREDIENTS_PRICE = { salad: 1.20, meat: 1.30, bacon: 2.3, cheese: 3.4 }

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        
    }

    state = {
        canPlaceOrder: false,
        purchasing: false,
        totalPrice: 4,
        loading: false
    }

    updatePurchaseState(ingredients) {
        const selectedIngredientCount = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, curr) => {
            return sum + curr;
        }, 0);
        this.setState({
            canPlaceOrder: selectedIngredientCount > 0
        });
    }

    addIngredient = (type) => {
        const prevCount = this.props.ingredients[type];
        const currCount = prevCount + 1;
        const updatedIngredients = { ...this.props.ingredients };
        updatedIngredients[type] = currCount;

        const finalPriceAfterAddingIngredient = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: finalPriceAfterAddingIngredient
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        if (this.props.ingredients[type] === 0) {
            return;
        }
        const prevCount = this.props.ingredients[type];
        const currCount = prevCount - 1;
        const updatedIngredients = { ...this.props.ingredients };
        updatedIngredients[type] = currCount;
        const finalPriceAfterAddingIngredient = this.state.totalPrice - INGREDIENTS_PRICE[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: finalPriceAfterAddingIngredient
        });
        this.updatePurchaseState(updatedIngredients);
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
            Price: this.state.totalPrice,
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
            totalPrice={this.state.totalPrice}
        ></OrderSummary>
        if (this.state.loading) {
            order = <Spinner></Spinner>
        }

        let burger = (
            <Aux>
                <Burger ingredients={this.props.ingredients}></Burger>
                <BuildControls addIngredient={(value) => this.props.onAddIngredient(value)}
                    removeIngredient={(value) => this.props.onRemoveIngredient(value)} disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    placeOrder={this.state.canPlaceOrder}
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
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (value) => dispatch({type: actionTypes.ADD_INGREDIENT,  ingredientName: value }),
        onRemoveIngredient: (value) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: value }),
    }
}



export default WithErrorHandler(connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder), AxiosOrder);