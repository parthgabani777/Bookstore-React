import { findItems } from "../utils/utils";

export const wishlistReducer = (state, action) => {
    const { id } = action.payload.product ?? {};

    switch (action.type) {
        case "ADD_TO_WISHLIST":
            let isItemInWishlist = findItems(
                state.itemInWishlist,
                action.payload.product
            );

            return isItemInWishlist
                ? state
                : {
                      ...state,
                      itemInWishlist: state.itemInWishlist.concat(
                          action.payload.product
                      ),
                  };

        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                itemInWishlist: state.itemInWishlist.filter(
                    (item) => item.id !== id
                ),
            };
        case "SET_WISHLIST":
            return action.payload;
        case "RESET_WISHLIST":
            return {
                itemInWishlist: [],
            };
    }
};
