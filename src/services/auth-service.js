import axios from "axios";
import { toast } from "react-toastify";

const loginHandler = async (loginCredentials, setAuthTokens, navigation) => {
    try {
        const { data } = await axios.post("/api/auth/login", {
            email: loginCredentials.email,
            password: loginCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
        toast.success("Successfully logged in.");
    } catch (error) {
        console.log(loginCredentials, error);
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

const signupHandler = async (signupCredentials, setAuthTokens, navigation) => {
    try {
        const { data } = await axios.post("/api/auth/signup", {
            firstName: signupCredentials.firstName,
            lastName: signupCredentials.lastName,
            email: signupCredentials.email,
            password: signupCredentials.password,
        });
        const encodedToken = data.encodedToken;
        localStorage.setItem("token", encodedToken);
        setAuthTokens(encodedToken);
        navigation("/");
    } catch (error) {
        switch (error.response.status) {
            case 422:
                throw "Username alrady exists.";
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
