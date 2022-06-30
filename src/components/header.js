import { React, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useCart } from "../context/cart-context";
import { useWishlist } from "../context/wishlist-context";
import "../css/header.css";
import { useProduct } from "../context/product-context";
import { useClickOutside } from "../hooks/useClickOutside";

function Header() {
    const { cart, dispatchCart } = useCart();
    const { wishlist, dispatchWishlist } = useWishlist();
    const { auth, signoutHandler, removeAuthTokens } = useAuth();
    const [product] = useProduct();
    const navigation = useNavigate();

    // For search query
    const [search, setSearch] = useState("");
    const onChangeHandler = (e) => {
        setSearch(e.target.value);
    };
    const debounce = (cb, delay = 300) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => cb(...args), delay);
        };
    };
    const debouncedOnChangeHandler = debounce(onChangeHandler, 300);

    // For filtering the products based on search query
    const filteredProducts = product.filter((product) => {
        const result = product.title.toLowerCase().search(search.toLowerCase());
        return result === -1 ? false : true;
    });

    // For showing search results
    const [showSearchResults, setShowSearchResults] = useState(false);
    const ref = useRef();
    const inputRef = useRef();
    useClickOutside(ref, () => {
        setShowSearchResults(false);
    });

    const [showNavItems, setShowNavItems] = useState(true);

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

                <div className="nav-search" ref={ref}>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-box text-s"
                        placeholder="Search..."
                        onChange={debouncedOnChangeHandler}
                        onClick={() => setShowSearchResults(true)}
                    />
                    <button className="btn search-btn">
                        <i className="fa fa-search"></i>
                    </button>
                    {showSearchResults && search !== "" && (
                        <div
                            className="suggestion"
                            onClick={() => {
                                setShowSearchResults(false);
                                inputRef.current.value = "";
                            }}
                        >
                            {filteredProducts.length !== 0 ? (
                                filteredProducts.map((item) => (
                                    <Link
                                        to={`/product?pid=${item._id}`}
                                        key={item._id}
                                    >
                                        {item.title}
                                    </Link>
                                ))
                            ) : (
                                <div>No results found</div>
                            )}
                        </div>
                    )}
                </div>

                <div
                    className="humburger text-l"
                    onClick={() => {
                        setShowNavItems(!showNavItems);
                    }}
                >
                    <i className="fas fa-bars btn"></i>
                </div>

                <ul
                    className={`nav-item-group text-s ${
                        showNavItems
                            ? "nav-item-group-show"
                            : "nav-item-group-hide"
                    }`}
                >
                    <li className="nav-item">
                        <NavLink
                            to="homepage"
                            activeclassname="active"
                            className="nav-link btn"
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink
                            to="product"
                            activeclassname="active"
                            className="nav-link btn"
                        >
                            Explore
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        {auth.isAuthorized ? (
                            <a
                                className="nav-link btn"
                                onClick={() => {
                                    signoutHandler(
                                        removeAuthTokens,
                                        navigation,
                                        dispatchWishlist,
                                        dispatchCart
                                    );
                                }}
                            >
                                Logout
                            </a>
                        ) : (
                            <NavLink to="login" className="nav-link btn">
                                Login
                            </NavLink>
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
