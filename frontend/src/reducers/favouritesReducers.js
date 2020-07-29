import { FAVOURITES_ADD_ITEM } from "../constants/favouritesConstants";

function favouritesReducer(state={favouritesItems: []},action){
    switch(action.type){
        case FAVOURITES_ADD_ITEM:
            const item = action.payload;
            const product = state.favouritesItems.find(x=> x.product === item.product);
            if(product){
             return { favouritesItems:  state.favouritesItems.map(x=>x.product=== product.product? item: x) };
            }
            return { favouritesItems: [...state.favouritesItems, item]};
            default:
                return state
    }
}

export {favouritesReducer}