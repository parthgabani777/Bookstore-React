import axios from "axios";

const getWishlist = async (encodedToken, dispatchWishlist) => {
    try {
        const { data } = await axios.get(`/api/user/wishlist`, {
            headers: {
                authorization: encodedToken,
            },
        });
        const wishlist = data.wishlist;
        dispatchWishlist({
            type: "SET_WISHLIST",
            payload: { itemInWishlist: wishlist },
        });
    } catch (error) {
        console.log(error);
    }
};

const addToWishlist = async (encodedToken, product, dispatchWishlist) => {
    try {
        const { data } = await axios.post(
            `/api/user/wishlist`,
            { product },
            {
                headers: {
                    authorization: encodedToken,
                },
            }
        );
        dispatchWishlist({
            type: "ADD_TO_WISHLIST",
            payload: { product },
        });
    } catch (error) {
        console.log(error);
    }
};

const removeFromWishlist = async (encodedToken, product, dispatchWishlist) => {
    try {
        const { data } = await axios.delete(
            `/api/user/wishlist/${product._id}`,
            {
                headers: {
                    authorization: encodedToken,
                },
            }
        );
        dispatchWishlist({
            type: "REMOVE_FROM_WISHLIST",
            payload: { product },
        });
    } catch (error) {
        console.log(error);
    }
};

export { addToWishlist, removeFromWishlist, getWishlist };
