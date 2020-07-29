import {FAVOURITES_ADD_ITEM} from "../constants/favouritesConstants";

const { default: Axios } = require("axios")


const addToFavourites = (productId) => async (dispatch) =>{

    try{
        const {data} = await Axios.get("/api/products/" + productId);
        dispatch({
            type: FAVOURITES_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price
        }})

    } catch (error) {

    }
}

export {addToFavourites}