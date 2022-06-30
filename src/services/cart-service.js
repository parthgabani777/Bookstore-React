import axios from "axios";
import { toast } from "react-toastify";

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
        toast.error("Cart items can not be fetched.");
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
        toast.dismiss();
        toast.success("Item added in cart.");
    } catch (error) {
        toast.error("Item can not be added.");
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
        toast.dismiss();
        toast.success("Item removed from cart.");
    } catch (error) {
        toast.error("Item can not be removed.");
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
        toast.error("Quantity can not be changed.");
    }
};

export { addToCart, removeFromCart, getCart, changeQuantity };
