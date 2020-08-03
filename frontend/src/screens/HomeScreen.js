import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';

function HomeScreen(props) {
    // defined hook for search keyword
    const [searchKeyword, setSearchKeyword] = useState('');
    // if the category exists, show it else show an empty string. for the category filtering
    const category = props.match.params.id ? props.match.params.id : '';
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(listProducts(category));
        return () => {
            //
        };
        //the empty array assures this code runs after everything else in this component is ran
    }, [category]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(listProducts(category, searchKeyword))
        
    }

    // if loading or theres an error the messages will be displayed, if neither the data gets displayed
    return <>
        {category &&
            <h2>{category}</h2>}
        <ul className="filter">
            <li>
                <form onSubmit={submitHandler}>
                    <input name="searchKeyword" onChange={(e) => setSearchKeyword(e.target.value)} />
                    <button type="submit">Search</button>
                </form>
            </li>
        </ul>
        {loading ? <div>Loading...</div> :
            error ? <div>{error}</div> :
                <ul className="products">
                    {
                        products.map(product =>
                            <li key={product._id}>
                                <div className="product">
                                    <Link to={'/product/' + product._id}>
                                        <img className="product-image" src={product.image} alt="product" />
                                    </Link>
                                    <div className="product-name">
                                        {/* This link concatinates the product page with the id of the product you click to deliver info on the product */}
                                        <Link to={'/product/' + product._id}>{product.name}</Link>
                                    </div>
                                    <div className="product-brand">{product.brand}</div>
                                    <div className="product-price">{product.platform}</div>
                                    <div className="product-description">{product.description}</div>
                                    <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
                                </div>
                            </li>)
                    }
                </ul>
         } </>
}


export default HomeScreen;