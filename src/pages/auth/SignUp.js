import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth-context";
import "./auth.css";
import { toast } from "react-toastify";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";

function SignUp() {
    const navigation = useNavigate();
    const { setAuthTokens, signupHandler } = useAuth();

    const defaultSignupCredentials = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };
    const [signupCredentials, setSignupCredentials] = useState(
        defaultSignupCredentials
    );
    const { firstName, lastName, email, password } = signupCredentials;

    const [showPassword, setShowPassword] = useState(false);

    const { dispatchCart } = useCart();
    const { dispatchWishlist } = useWishlist();

    const submitSignupCredentials = async (e) => {
        e.preventDefault();
        try {
            await signupHandler(
                signupCredentials,
                setAuthTokens,
                navigation,
                dispatchCart,
                dispatchWishlist
            );
        } catch (error) {
            toast.error(error);
        }
    };

    const guestSignupHandler = (e) => {
        e.preventDefault();
        setSignupCredentials({
            firstName: "john",
            lastName: "doe",
            email: "johndoe@email.com",
            password: "johndoe@123",
        });
    };

    return (
        <section className="auth text-s">
            <form
                className="auth-form box-shadow p-4"
                onSubmit={submitSignupCredentials}
            >
                <h3 className="text-l text-center py-1">Register</h3>

                <div className="input-group py-1">
                    <label htmlFor="firstname">First name</label>
                    <input
                        type="text"
                        className="input text-s"
                        placeholder="firstname"
                        id="firstname"
                        value={firstName}
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
                                firstName: e.target.value,
                            });
                        }}
                        required
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="lastname">Last name</label>
                    <input
                        type="text"
                        className="input text-s"
                        id="lastname"
                        placeholder="lastname"
                        value={lastName}
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
                                lastName: e.target.value,
                            });
                        }}
                        required
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="text"
                        className="input text-s"
                        id="email"
                        placeholder="mail@gmail.com"
                        value={email}
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
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
                            value={password}
                            onChange={(e) => {
                                setSignupCredentials({
                                    ...signupCredentials,
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
                        Create an Account
                    </button>
                </div>

                <div className="py-1 text-center">
                    <button
                        className="btn btn-secondary auth-btn br-1"
                        onClick={guestSignupHandler}
                    >
                        Fill guest details
                    </button>
                </div>

                <div className="py-1 text-center">
                    <Link to="/login" className="link-blue">
                        Already have account
                    </Link>
                </div>
            </form>
        </section>
    );
}

export { SignUp };
