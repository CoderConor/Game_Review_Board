import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import {favouritesReducer} from './reducers/favouritesReducers';

const initialState= {};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    favourites: favouritesReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store;