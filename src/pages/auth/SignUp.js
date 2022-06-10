import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth-context";
import "./auth.css";
import { toast } from "react-toastify";

function SignUp() {
    const navigation = useNavigate();
    const { setAuthTokens, signupHandler } = useAuth();

    const defaultSignupCredentials = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
    };
    const [signupCredentials, setSignupCredentials] = useState(
        defaultSignupCredentials
    );

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="auth text-s">
            <div className="auth-form box-shadow p-4">
                <h3 className="text-l text-center py-1">Register</h3>

                <div className="input-group py-1">
                    <label htmlFor="firstname">Firstname</label>
                    <input
                        type="text"
                        className="input text-s"
                        placeholder="firstname"
                        id="firstname"
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
                                firstname: e.target.value,
                            });
                        }}
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="lastname">Lastname</label>
                    <input
                        type="text"
                        className="input text-s"
                        id="lastname"
                        placeholder="lastname"
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
                                lastname: e.target.value,
                            });
                        }}
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="email">Email address</label>
                    <input
                        type="text"
                        className="input text-s"
                        id="email"
                        placeholder="mail@gmail.com"
                        onChange={(e) => {
                            setSignupCredentials({
                                ...signupCredentials,
                                email: e.target.value,
                            });
                        }}
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
                            onChange={(e) => {
                                setSignupCredentials({
                                    ...signupCredentials,
                                    password: e.target.value,
                                });
                            }}
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

                <div className="input-checkbox py-1">
                    <div>
                        <input type="checkbox" id="remember_me" />
                        <label htmlFor="remember_me">
                            I accept all terms and conditions
                        </label>
                    </div>
                </div>

                <div className="py-1 text-center">
                    <button
                        className="btn btn-secondary auth-btn br-1"
                        onClick={async () => {
                            try {
                                await signupHandler(
                                    signupCredentials,
                                    setAuthTokens,
                                    navigation
                                );
                            } catch (error) {
                                toast.error(error);
                            }
                        }}
                    >
                        Create an Account
                    </button>
                </div>

                <div className="py-1 text-center">
                    <Link to="/login" className="link-blue">
                        Already have account
                    </Link>
                </div>
            </div>
        </section>
    );
}

export { SignUp };
