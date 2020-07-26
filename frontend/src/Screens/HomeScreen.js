import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen(props) {

    const [products, setProduct] = useState([]);
// used to fetch the data
    useEffect(() => {
        const fetchData = async () =>{
            const {data} = await axios.get("/api/products");
            setProduct(data);
        } 
        fetchData();
        return () => {
            //
        };
        //the empty array assures this code runs after everything else in this component is ran
    }, [])

    return <ul className="products">
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
                        <div className="product-price">${product.price}</div>
                        <div className="product-rating">{product.rating} Stars ({product.numReviews})</div>
                    </div>
                </li>
            )
        }
    </ul>
}
export default HomeScreen;