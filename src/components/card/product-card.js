import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { findItems } from "../../utils/utils";
import { useAuth } from "../../context/auth-context";
import { useCart } from "../../context/cart-context";
import { useWishlist } from "../../context/wishlist-context";
import "./product-card.css";

function ProductCard({ product }) {
    const { wishlist, dispatchWishlist, addToWishlist, removeFromWishlist } =
        useWishlist();
    const { cart, dispatchCart, addToCart } = useCart();
    const { auth } = useAuth();

    const navigation = useNavigate();

    return (
        <div className="card card-badge badge-icon box-shadow product-card">
            {findItems(wishlist.itemInWishlist, product) ? (
                <i
                    className="fas fa-heart badge badge-top-right active text-m"
                    onClick={() => {
                        removeFromWishlist(
                            auth.token,
                            product,
                            dispatchWishlist
                        );
                    }}
                ></i>
            ) : (
                <i
                    className="fas fa-heart badge badge-top-right text-m"
                    onClick={() => {
                        auth.isAuthorized
                            ? addToWishlist(
                                  auth.token,
                                  product,
                                  dispatchWishlist
                              )
                            : navigation("/login");
                    }}
                ></i>
            )}

            <div className="card-img">
                <img src={product.image} alt="Image" />
            </div>
            <div className="card-body">
                <div className="card-content p-1">
                    <div className="fw-semibold text-s">{product.title}</div>
                    <div className="fw-bold text-m pt-1 price-rating-container">
                        ${product.price}{" "}
                        <div className="rating rating-text text-m">
                            <p>{product.rating}</p>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                </div>
                <div className="card-actions p-1 text-s">
                    {findItems(cart.itemInCart, product) ? (
                        <button className="btn btn-primary">
                            <Link to="/cart" className="w-100 block">
                                Go To Cart
                            </Link>
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                auth.isAuthorized
                                    ? addToCart(
                                          auth.token,
                                          product,
                                          dispatchCart
                                      )
                                    : navigation("/login");
                            }}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
