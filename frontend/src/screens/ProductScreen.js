import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct } from '../actions/productActions';


function ProductScreen(props) {
  
    // using useSelector to access product details state from redux, useDispatch to dispatch an action detailsProduct
  const productDetails = useSelector(state => state.productDetails);
// retrieving product, loading and error from productDetails
  const {product, loading, error} = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    //   property matches what the user entered in the url
      dispatch(detailsProduct(props.match.params.id));
      return () => {
        //   
      };
  }, []);

//   add to favourites function, push to redirect to correct url
  const handleAddtoFavourites = () =>{
      props.history.push("/favourites/" + props.match.params.id )
  }
  
    return <div>
        <div className="back-to-result">
            <Link to="/">Back to result</Link>
        </div>
        {loading? <div>Loading...</div>:
        error? <div>{error} </div>:
        (
            <div className="details">
        <div className="details-image">
            <img src={product.image} alt="product"></img>
        </div>
        <div className="details-info">
            <ul>
                <li>
                    <h4>{product.name}</h4>
                </li>
                <li>
                    {product.rating} Stars ({product.numReviews} Reviews)
                </li>
                <li>
                    Price:<strong>${product.price}</strong>
                </li>
                <li>
                    Description:
                    <div>
                        {product.description}
                    </div>
                </li>
            </ul>
        </div>
        <div className="details-action">
            <ul>
               <li>
                   Price: {product.price}
               </li> 
               <li>
                   Status: {product.status}
               </li> 
               <li>
                   Qty: <select>
                       <option>1</option>
                       <option>2</option>
                       <option>3</option>
                       <option>4</option>
                   </select>
                   <option></option>
               </li> 
               <li>
                   <button onClick= {handleAddtoFavourites} className="button">Add to Favourites</button>
               </li>
            </ul>
        </div>
        </div>
        )
        }

        
    </div>
}
export default ProductScreen;