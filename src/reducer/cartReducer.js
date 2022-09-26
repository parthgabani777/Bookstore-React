import { cartConstant } from "./reducer-constant";

export const cartReducer = (state, action) => {
    const { _id } = action.payload.product ?? {};

    switch (action.type) {
        case cartConstant.ADD_TO_CART:
            return {
                ...state,
                itemInCart: state.itemInCart.concat({
                    ...action.payload.product,
                    qty: 1,
                }),
            };

        case cartConstant.REMOVE_FROM_CART:
            return {
                ...state,
                itemInCart: state.itemInCart.filter((item) => item._id != _id),
            };

        case cartConstant.INCREASE_QUANTITY:
            console.log();
            return {
                ...state,
                itemInCart: state.itemInCart.map((item) =>
                    item._id === _id ? { ...item, qty: item.qty + 1 } : item
                ),
            };

        case cartConstant.DECREASE_QUANTITY:
            let isItemQuantityLess = state.itemInCart.some(
                (item) => item._id === _id && item.qty <= 1
            );

            return isItemQuantityLess
                ? {
                      ...state,
                      itemInCart: state.itemInCart.filter(
                          (item) => item._id !== _id || item.qty > 1
                      ),
                  }
                : {
                      ...state,
                      itemInCart: state.itemInCart.map((item) =>
                          item._id === _id
                              ? { ...item, qty: item.qty - 1 }
                              : item
                      ),
                  };

        case cartConstant.SET_CART:
            return action.payload;
        case cartConstant.RESET_CART:
            return {
                itemInCart: [],
            };
    }
};
