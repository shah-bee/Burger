import * as actionTypes from '../actions/actionTypes';
import AxiosOrder from '../../axios-order';

const INGREDIENTS_PRICE = { salad: 1.20, meat: 1.30, bacon: 2.3, cheese: 3.4 }

const loadIngredients = function () {
    AxiosOrder.get('https://real-time-burger.firebaseio.com/ingredients.json')
        .then(res => {
            return res.data;
        }).catch(error => { });
}

const initialState = {
    ingredients: {
        salad: 0,
        cheese: 0,
        bacon: 0,
        meat: 0
    },
    totalPrice: 4
}

const burgerBuilder = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
                    
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
        return {
            ...state,
            ingredients: {
                ...state.ingredients,
                [action.ingredientName]: state.ingredients[action.ingredientName] - 1
            }
        }
    }
    return state;
}

export default burgerBuilder;