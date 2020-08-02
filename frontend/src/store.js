import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducers';
import {favouritesReducer} from './reducers/favouritesReducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';

const favouritesItems = Cookie.getJSON("favouritesItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

// creating an initialState based on the item that comes from the cookie, allowing favourites to stay updated
const initialState= { favourites: { favouritesItems }, userSignin:{ userInfo } };
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    favourites: favouritesReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    userUpdate: userUpdateReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk))
);

export default store;