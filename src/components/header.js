import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import "../css/header.css";

function Header() {
    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const { auth, signoutHandler, removeAuthTokens } = useAuth();
    const navigation = useNavigate();

    return (
        <header>
            <nav className="navbar bg-dark">
                <div className="nav-title">
                    <h1 className="text-xl">
                        <Link to="homepage" className="btn">
                            BookStore
                        </Link>
                    </h1>
                </div>

                <div className="nav-search">
                    <input
                        type="text"
                        className="search-box text-s"
                        placeholder="Search..."
                    />
                    <button className="btn search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                </div>

                <div className="humburger text-l">
                    <i className="fas fa-bars btn"></i>
                </div>

                <ul className="nav-item-group text-s">
                    <li className="nav-item">
                        <Link to="homepage" className="nav-link btn">
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="product" className="nav-link btn">
                            Explore
                        </Link>
                    </li>
                    <li className="nav-item">
                        {auth.isAuthorized ? (
                            <a
                                className="nav-link btn"
                                onClick={() => {
                                    signoutHandler(
                                        removeAuthTokens,
                                        navigation
                                    );
                                }}
                            >
                                Logout
                            </a>
                        ) : (
                            <Link to="login" className="nav-link btn">
                                Login
                            </Link>
                        )}
                    </li>
                    <div className="nav-icons">
                        <Link
                            to="wishlist"
                            className="nav-item badge-icon text-m"
                        >
                            <i className="fas fa-heart nav-link btn"></i>
                            <p className="badge badge-top-right badge-text text-xs">
                                {wishlist.itemInWishlist.length}
                            </p>
                        </Link>
                        <Link to="cart" className="nav-item badge-icon text-m">
                            <i className="fas fa-shopping-cart nav-link btn"></i>
                            <p className="badge badge-top-right badge-text text-xs">
                                {cart.itemInCart.length}
                            </p>
                        </Link>
                    </div>
                </ul>
            </nav>
        </header>
    );
}

export { Header };
