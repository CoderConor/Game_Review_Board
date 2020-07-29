import React, { useEffect } from 'react';
import { addToFavourites, removeFromFavourites } from '../actions/favouriteActions';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function FavouritesScreen(props){

    const favourites = useSelector(state => state.favourites);

    const {favouritesItems} = favourites;

    const productId = props.match.params.id;
    const dispatch= useDispatch();
    const removeFromFavouritesHandler = (productId) => {
        dispatch(removeFromFavourites(productId));
    }
    // if the product id exists, add to favourites
    useEffect(() =>{
        if(productId){
            dispatch(addToFavourites(productId));
        }
    }, [])

    return <div className="favourites">
    <div className="favourites-list">
        <ul className="favourites-list-container">
        <li>
            <h3>
                Favourites List
            </h3>
        </li>
        {favouritesItems.length ===0 ? 
        <div>
            No Favourites added
        </div>
        :
        favouritesItems.map( item =>
        <li>
        <div className="favourites-image">
        <img src={item.image} alt="product" /> 
        </div>
            <div className="favourites-name">
                <div className="favourites-title">
                <Link to={"/product/" + item.product }>
                    {item.name}
                    </Link>
                </div>
                <div>
                    {item.platform}
                </div>
                <div>
                    {item.desc}
                   <button type="button" className="button" onClick={() => removeFromFavouritesHandler(item.product)}>
                       Remove
                   </button> 
                </div>
            </div>
        </li>
        )
        }
        </ul>
    </div>
    <div className="favourites-action">

    </div>
    </div>
}

export default FavouritesScreen;