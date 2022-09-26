import axios from "axios";
import { toast } from "react-toastify";

const getWishlist = async (encodedToken, dispatchWishlist) => {
    try {
        const { data } = await axios.get(`/user/wishlist`, {
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
        toast.error("Wishlist items can not be fetched.");
    }
};

const addToWishlist = async (encodedToken, product, dispatchWishlist) => {
    try {
        const { data } = await axios.post(
            `/user/wishlist`,
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
        toast.dismiss();
        toast.success("Item added in wishlist");
    } catch (error) {
        toast.error("Item can not be added.");
    }
};

const removeFromWishlist = async (encodedToken, product, dispatchWishlist) => {
    try {
        const { data } = await axios.delete(`/user/wishlist/${product._id}`, {
            headers: {
                authorization: encodedToken,
            },
        });
        dispatchWishlist({
            type: "REMOVE_FROM_WISHLIST",
            payload: { product },
        });
        toast.dismiss();
        toast.error("Item removed from wishlist");
    } catch (error) {
        toast.error("Item can not be removed.");
    }
};

export { addToWishlist, removeFromWishlist, getWishlist };
