import React, { Component } from 'react';
import Aux from '../../hoc/Taher';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    // }

    state = {
        ingredients: {
            salad:0,
            cheese:2,
            bacon:2,
            meat:2
        }
        // totalPrice: 0,
        // isCheckedOut: false
    }
    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls></BuildControls>
            </Aux>
        );
    }

}

export default BurgerBuilder;