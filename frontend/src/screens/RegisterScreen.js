import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';


function RegisterScreen(props) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [rePassword, setRePassword] = useState('');
    const userRegister = useSelector(state=>state.userRegister);
    const { loading, userInfo, error} = userRegister;
    const dispatch = useDispatch();
    const redirect = props.location.search?props.location.search.split("=")[1]:'/';

    

  useEffect(() => {
//    if the user info exists, redirect to homepage
    if (userInfo) {
        props.history.push(redirect);
    }
      return () => {
        //   
      };
  }, [userInfo]);

  const submitHandler = (e) =>{
      e.preventDefault();
      dispatch(register(name, email, password,));
  }


    return <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>Create Account</h2>
                </li>
                <li>
                    {loading && <div>Loading...</div>}
                    {error && <div>{error}</div>}

                </li>
                <li>
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="name" name="name" id="name" placeholder="John Smith" required onChange={(e) =>setName(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email" name="email" id="email" required onChange={(e) =>setEmail(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" 
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" required
                    onChange={(e) =>setPassword(e.target.value)}>
                    </input>
                </li>
                {/* <li>
                    <label htmlFor="rePassword">Re-enter Password</label>
                    <input type="Password" id="rePassword" name="rePassword" minLength="5" required onChange={(e) =>setRePassword(e.target.value)}>
                    </input>
                </li> */}
                <li>
                    <button type="submit" className="button primary">Register</button>
                </li>
                <li>
                    Already have an account? 
                    <Link to={redirect === "/" ? "signin" : "signin?redirect=" + redirect} className="button secondary text-center">Click here to login</Link>
                </li>
            </ul>
        </form>
    </div>
}
export default RegisterScreen;