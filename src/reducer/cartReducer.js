import { cartConstant } from "./reducer-constant";

export const cartReducer = (state, action) => {
    const { id } = action.payload.product ?? {};

    switch (action.type) {
        case cartConstant.ADD_TO_CART:
            return {
                ...state,
                itemInCart: state.itemInCart.concat({
                    ...action.payload.product,
                    quantity: 1,
                }),
            };

        case cartConstant.REMOVE_FROM_CART:
            return {
                ...state,
                itemInCart: state.itemInCart.filter((item) => item.id != id),
            };

        case cartConstant.INCREASE_QUANTITY:
            return {
                ...state,
                itemInCart: state.itemInCart.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case cartConstant.DECREASE_QUANTITY:
            let isItemQuantityLess = state.itemInCart.some(
                (item) => item.id === id && item.quantity <= 1
            );

            return isItemQuantityLess
                ? {
                      ...state,
                      itemInCart: state.itemInCart.filter(
                          (item) => item.id !== id || item.quantity > 1
                      ),
                  }
                : {
                      ...state,
                      itemInCart: state.itemInCart.map((item) =>
                          item.id === id
                              ? { ...item, quantity: item.quantity - 1 }
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
