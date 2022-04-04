import { createContext, useContext, useReducer, useEffect } from "react";
import { cartReducer } from "../reducer/cartReducer";
import {
    addToCart,
    removeFromCart,
    getCart,
    changeQuantity,
} from "../services/cart-service";
import { useAuth } from "./auth-context";

const defaultCartValue = {
    itemInCart: [],
};

const CartContext = createContext();

const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cart, dispatchCart] = useReducer(cartReducer, defaultCartValue);

    const { auth } = useAuth();

    useEffect(() => {
        auth.isAuthorized && getCart(auth.token, dispatchCart);
    }, []);

    return (
        <CartContext.Provider
            value={{
                cart,
                dispatchCart,
                addToCart,
                removeFromCart,
                getCart,
                changeQuantity,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export { CartProvider, useCart };
