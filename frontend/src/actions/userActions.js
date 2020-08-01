import Axios from "axios";
import Cookie from 'js-cookie';
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL } from "../constants/userConstants";

// when a user requests sign in, dispatch email and password request and post the email and password to the below endpoint
const signin = (email, password) => async (dispatch) => {
   dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
   try {
       const {data} = await Axios.post("/api/users/signin", {email, password});
       dispatch({type: USER_SIGNIN_SUCCESS, payload: data});
    //    the user data will be saved in this cookie if they close/reopen app
       Cookie.set('userInfo', JSON.stringify(data));
   } catch (error) {
    dispatch({type: USER_SIGNIN_FAIL, payload: error.message });
   } 
}

const register = (name, email, password) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, password}});
    try {
        const {data} = await Axios.post("/api/users/register", {name, email, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload: data});
        Cookie.set('userInfo', JSON.stringify(data));
    } catch (error) {
     dispatch({type: USER_REGISTER_FAIL, payload: error.message });
    } 
 }

export {signin, register};