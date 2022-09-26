import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth-context";
import "./auth.css";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

function Login() {
    const navigation = useNavigate();
    const { setAuthTokens, loginHandler } = useAuth();

    const defaultLoginCredentials = {
        email: "",
        password: "",
    };
    const [loginCredentials, setLoginCredentials] = useState(
        defaultLoginCredentials
    );

    const [showPassword, setShowPassword] = useState(false);

    const { dispatchCart } = useCart();
    const { dispatchWishlist } = useWishlist();

    const login = async (loginCredentials) => {
        try {
            await loginHandler(
                loginCredentials,
                setAuthTokens,
                navigation,
                dispatchCart,
                dispatchWishlist
            );
        } catch (error) {
            toast.error(error);
        }
    };

    const submitLoginCredentials = async (e) => {
        e.preventDefault();
        login(loginCredentials);
    };

    const guestLoginHandler = (e) => {
        e.preventDefault();
        login({
            email: "gabaniparth04@gmail.com",
            password: "parth123@",
        });
    };

    return (
        <section className="auth text-s">
            <form
                className="auth-form box-shadow p-4"
                onSubmit={submitLoginCredentials}
            >
                <h3 className="text-l text-center py-1">Login</h3>

                <div className="input-group py-1">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="text"
                        className="input text-s"
                        id="email"
                        placeholder="mail@gmail.com"
                        value={loginCredentials.email}
                        onChange={(e) => {
                            setLoginCredentials({
                                ...loginCredentials,
                                email: e.target.value,
                            });
                        }}
                        required
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="password">Password</label>

                    <div className="password-input">
                        <input
                            type={showPassword ? "text" : "password"}
                            className="input text-s"
                            id="password"
                            placeholder="************"
                            value={loginCredentials.password}
                            onChange={(e) => {
                                setLoginCredentials({
                                    ...loginCredentials,
                                    password: e.target.value,
                                });
                            }}
                            required
                        />
                        <i
                            className={`fas ${
                                showPassword ? "fa-eye-slash" : "fa-eye"
                            } `}
                            onClick={() => {
                                setShowPassword(!showPassword);
                            }}
                        ></i>
                    </div>
                </div>

                <div className="py-1 text-center">
                    <button className="btn btn-secondary auth-btn br-1">
                        Login
                    </button>
                </div>

                <div className="py-1 text-center">
                    <button
                        className="btn btn-secondary auth-btn br-1"
                        onClick={guestLoginHandler}
                    >
                        Login as guest
                    </button>
                </div>

                <div className="py-1 text-center">
                    <Link to="/signup" className="link-blue">
                        Create an Account
                    </Link>
                </div>
            </form>
        </section>
    );
}

export { Login };
