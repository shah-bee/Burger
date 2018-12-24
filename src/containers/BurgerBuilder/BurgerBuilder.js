import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Taher';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICE = { salad: 1.20, meat: 1.30, bacon: 2.3, cheese: 3.4 }

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        ingredients: {
            salad: 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice: 4,
        canPlaceOrder: false,
        purchasing: false
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

    continuePurchaseHandler = () => {
        alert('Continue purchase...');
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} cancel={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        cancel={this.cancelPurchaseHandler}
                        continue={this.continuePurchaseHandler}
                        totalPrice={this.state.totalPrice}
                    ></OrderSummary>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls addIngredient={this.addIngredient}
                    removeIngredient={this.removeIngredient} disabledInfo={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    placeOrder={this.state.canPlaceOrder}
                    OrderSummary={this.purchaseHandler}
                ></BuildControls>
            </Aux>
        );
    }

}

export default BurgerBuilder;