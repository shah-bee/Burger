import * as actionTypes from './actions';
import AxiosOrder from '../axios-order';

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

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                }
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

export default burgerReducer;