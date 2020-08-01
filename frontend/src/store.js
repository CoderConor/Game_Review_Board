import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import {favouritesReducer} from './reducers/favouritesReducers';

const favouritesItems = Cookie.getJSON("favouritesItems") || [];
// creating an initialState based on the item that comes from the cookie, allowing favourites to stay updated
const initialState= { favourites: { favouritesItems }};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    favourites: favouritesReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store;