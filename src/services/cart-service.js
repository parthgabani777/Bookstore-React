import axios from "axios";

const getCart = async (encodedToken, dispatchCart) => {
    try {
        const { data } = await axios.get(`/api/user/cart`, {
            headers: {
                authorization: encodedToken,
            },
        });
        const cart = data.cart;
        dispatchCart({
            type: "SET_CART",
            payload: { itemInCart: cart },
        });
    } catch (error) {
        console.log(error);
    }
};

const addToCart = async (encodedToken, product, dispatchCart) => {
    try {
        const { data } = await axios.post(
            `/api/user/cart`,
            { product },
            {
                headers: {
                    authorization: encodedToken,
                },
            }
        );
        dispatchCart({
            type: "ADD_TO_CART",
            payload: { product },
        });
    } catch (error) {
        console.log(error);
    }
};

const removeFromCart = async (encodedToken, product, dispatchCart) => {
    try {
        const { data } = await axios.delete(`/api/user/cart/${product._id}`, {
            headers: {
                authorization: encodedToken,
            },
        });
        dispatchCart({
            type: "REMOVE_FROM_CART",
            payload: { product },
        });
    } catch (error) {
        console.log(error);
    }
};

const changeQuantity = async (encodedToken, product, type, dispatchCart) => {
    try {
        type === "increment"
            ? dispatchCart({
                  type: "INCREASE_QUANTITY",
                  payload: { product },
              })
            : dispatchCart({
                  type: "DECREASE_QUANTITY",
                  payload: { product },
              });
        const { data } = await axios.post(
            `/api/user/cart`,
            {
                action: {
                    type: type,
                },
            },
            {
                headers: {
                    authorization: encodedToken,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export { addToCart, removeFromCart, getCart, changeQuantity };
