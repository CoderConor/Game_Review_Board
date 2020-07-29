import React, { useEffect } from 'react';
import { addToFavourites } from '../actions/favouriteActions';
import { useDispatch, useSelector } from 'react-redux';

function FavouritesScreen(props){

    const favourites = useSelector(state => state.favourites);

    const {favouritesItems} = favourites;

    const productId = props.match.params.id;
    const dispatch= useDispatch();
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
            <div>
                Price
            </div>
        </li>
        {favouritesItems.length ===0 ? 
        <div>
            No Favourites added
        </div>
        :
        favouritesItems.map( item =>
        <div>
            <img src={item.image} alt="product" />
            <div className="favourites-name">
                <div>
                    {item.name}
                </div>
                <div>
                    ${item.price}
                </div>
            </div>
        </div>
        )
        }
        </ul>
    </div>
    <div className="favourites-action">

    </div>
        Favourites Screen
    </div>
}

export default FavouritesScreen;