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

const INGREDIENTS_PRICE = { salad: 1.20, meat: 1.30, bacon: 2.3, cheese: 3.4 }

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    componentWillMount() {
        AxiosOrder.get('https://real-time-burger.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            }).catch(error => { });
    }

    state = {
        ingredients: null,
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
        this.setState({
            canPlaceOrder: selectedIngredientCount > 0
        });
    }

    addIngredient = (type) => {
        const prevCount = this.state.ingredients[type];
        const currCount = prevCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = currCount;

        const finalPriceAfterAddingIngredient = this.state.totalPrice + INGREDIENTS_PRICE[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: finalPriceAfterAddingIngredient
        });

        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => {
        if (this.state.ingredients[type] === 0) {
            return;
        }
        const prevCount = this.state.ingredients[type];
        const currCount = prevCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
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
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let order = <OrderSummary ingredients={this.state.ingredients} {...this.props}
            cancel={this.cancelPurchaseHandler}
            continue={this.continuePurchaseHandler}
            totalPrice={this.state.totalPrice}
        ></OrderSummary>
        if (this.state.loading) {
            order = <Spinner></Spinner>
        }

        let burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient} disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    placeOrder={this.state.canPlaceOrder}
                    OrderSummary={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        );
        if (!this.state.ingredients) {
            burger = <Spinner></Spinner>
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    {this.state.ingredients ? order : null}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default WithErrorHandler(BurgerBuilder, AxiosOrder);