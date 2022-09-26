import { createContext, useContext, useReducer, useEffect } from "react";
import { wishlistReducer } from "../reducer/wishlistReducer";
import { useAuth } from "./auth-context";
import {
    addToWishlist,
    removeFromWishlist,
    getWishlist,
} from "../services/wishlist-service";

const defaultWishlistValue = {
    itemInWishlist: [],
};

const wishlistContext = createContext();

const useWishlist = () => useContext(wishlistContext);

const WishlistProvider = ({ children }) => {
    const [wishlist, dispatchWishlist] = useReducer(
        wishlistReducer,
        defaultWishlistValue
    );

    const { auth } = useAuth();

    useEffect(() => {
        auth.isAuthorized && getWishlist(auth.token, dispatchWishlist);
    }, []);

    return (
        <wishlistContext.Provider
            value={{
                wishlist,
                dispatchWishlist,
                addToWishlist,
                removeFromWishlist,
                getWishlist,
            }}
        >
            {children}
        </wishlistContext.Provider>
    );
};

export { WishlistProvider, useWishlist };
