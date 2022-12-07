import { combineReducers } from "redux";
import types from "../types";
import auth from "./auth";
import product from "./product";
import cartReducer from "./cartReducer";
import categories from "./categoties"
import brand from "./brand";
import cartFavorite from './cartFavorites';
import bestselling from './bestselling'
import exclusive from './exclusive'
import orders from "./orders";
const appReducer = combineReducers({
    auth,
    product,
    cartReducer,
    categories,
    brand,
    cartFavorite,
    bestselling,
    exclusive,
    orders
})

const rootReducer = (state, action) => {
    if (action.type == types.CLEAR_REDUX_STATE) {
        state = undefined
    }
    return appReducer(state, action)
}
export default rootReducer