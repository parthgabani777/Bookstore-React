import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/auth-context";
import "./auth.css";
function Login() {
    const navigation = useNavigate();
    const { setAuthTokens, loginHandler } = useAuth();

    const defaultLoginCredentials = {
        email: "adarshbalika@gmail.com",
        password: "adarshbalika",
    };
    const [loginCredentials, setLoginCredentials] = useState(
        defaultLoginCredentials
    );

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="auth text-s">
            <div className="auth-form box-shadow p-4">
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
                    />
                </div>

                <div className="input-group py-1">
                    <label htmlFor="password">Password</label>

                    <div class="password-input">
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
                        />
                        <i
                            class={`fas ${
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
                        <label htmlFor="remember_me">Remember Me</label>
                    </div>
                    <a href="" className="link-blue">
                        Forget Password?
                    </a>
                </div>

                <div className="py-1 text-center">
                    <button
                        className="btn btn-secondary auth-btn br-1"
                        onClick={async () => {
                            await loginHandler(
                                loginCredentials,
                                setAuthTokens,
                                navigation
                            );
                        }}
                    >
                        Login
                    </button>
                </div>

                <div className="py-1 text-center">
                    <Link to="/signup" className="link-blue">
                        Create an Account
                    </Link>
                </div>
            </div>
        </section>
    );
}

export { Login };
