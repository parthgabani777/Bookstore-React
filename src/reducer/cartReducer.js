export const cartReducer = (state, action) => {
    const { id } = action.payload.product ?? {};

    switch (action.type) {
        case "ADD_TO_CART":
            return {
                ...state,
                itemInCart: state.itemInCart.concat({
                    ...action.payload.product,
                    quantity: 1,
                }),
            };

        case "REMOVE_FROM_CART":
            return {
                ...state,
                itemInCart: state.itemInCart.filter((item) => item.id != id),
            };

        case "INCREASE_QUANTITY":
            return {
                ...state,
                itemInCart: state.itemInCart.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ),
            };

        case "DECREASE_QUANTITY":
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

        case "SET_CART":
            return action.payload;
        case "RESET_CART":
            return {
                itemInCart: [],
            };
    }
};
