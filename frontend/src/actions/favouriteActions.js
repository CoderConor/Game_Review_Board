import {FAVOURITES_ADD_ITEM, FAVOURITES_REMOVE_ITEM} from "../constants/favouritesConstants";
import Cookie from "js-cookie";
import Axios from "axios";



const addToFavourites = (productId) => async (dispatch, getState) =>{

    try{
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type: FAVOURITES_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            desc: data.desc,
            platform: data.platform
        }
    });
    // gets the favourites items and save them to a cookie
    const {favourites: {favouritesItems}} = getState();
    Cookie.set("favouritesItems", JSON.stringify(favouritesItems));
    } catch (error) {

    }
}
const removeFromFavourites = (productId) => (dispatch, getState) =>{
    dispatch({type: FAVOURITES_REMOVE_ITEM, payload: productId});

    const {favourites:{favouritesItems}} = getState();
    Cookie.set("favouritesItems", JSON.stringify(favouritesItems));
}

export {addToFavourites, removeFromFavourites}