import axios from "axios";
import { toast } from "react-toastify";
import "./axios-config";
import { getCart } from "./cart-service";
import { getWishlist } from "./wishlist-service";

const loginHandler = async (
    loginCredentials,
    setAuthTokens,
    navigation,
    dispatchCart,
    dispatchWishlist
) => {
    try {
        const { data } = await axios.post("/auth/login", {
            email: loginCredentials.email,
            password: loginCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
        toast.success("Successfully logged in.");
        await getCart(encodedToken, dispatchCart);
        await getWishlist(encodedToken, dispatchWishlist);
    } catch (error) {
        switch (error.response.status) {
            case 401:
                throw "Wrong password.";
            case 404:
                throw "Email not found.";
            default:
                throw "Login failed.";
        }
    }
};

const signupHandler = async (
    signupCredentials,
    setAuthTokens,
    navigation,
    dispatchCart,
    dispatchWishlist
) => {
    try {
        const { data } = await axios.post("/auth/signup", {
            firstName: signupCredentials.firstName,
            lastName: signupCredentials.lastName,
            email: signupCredentials.email,
            password: signupCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
        await getCart(encodedToken, dispatchCart);
        await getWishlist(encodedToken, dispatchWishlist);
    } catch (error) {
        switch (error.response.status) {
            case 422:
                throw "Username already exists.";
            default:
                throw "Signup failed.";
        }
    }
};

const signoutHandler = async (
    removeAuthTokens,
    navigation,
    dispatchWishlist,
    dispatchCart
) => {
    localStorage.removeItem("token");
    removeAuthTokens();
    dispatchWishlist({ type: "RESET_WISHLIST", payload: {} });
    dispatchCart({ type: "RESET_CART", payload: {} });
    navigation("/");
};

export { loginHandler, signupHandler, signoutHandler };
