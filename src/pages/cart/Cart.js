import { React, useEffect } from "react";
import CartCard from "../../components/card/cart-card";
import { useCart } from "../../context/cart-context";
import "./cart.css";
import { discountPriceCalculator } from "../../utils/utils";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Cart() {
    const { cart, dispatchCart } = useCart();
    const { itemInCart } = cart;
    const { auth } = useAuth();
    const navigation = useNavigate();

    const normalPrice = itemInCart.reduce(
        (accu, currentValue) =>
            accu + currentValue.price * currentValue.quantity,
        0
    );

    const discountedPrice = itemInCart.reduce(
        (accu, currentValue) =>
            accu +
            discountPriceCalculator(currentValue.price, currentValue.discount) *
                currentValue.quantity,
        0
    );

    const totalQuantity = itemInCart.reduce(
        (acc, currentProduct) => acc + currentProduct.quantity,
        0
    );

    useEffect(() => {
        if (!auth.isAuthorized) {
            navigation("/login");
            toast.error("Login first.");
        }
    }, []);

    const totalPrice = normalPrice - discountedPrice;

    return (
        <section className="main cart">
            <h1 className="text-center text-l p-2">
                My Cart({itemInCart.length})
            </h1>

            {itemInCart.length === 0 ? (
                <h1 className="text-center text-m p-2">No item in cart</h1>
            ) : (
                <div className="cart-container">
                    <div className="card-items">
                        {itemInCart.map((product) => {
                            return (
                                <CartCard product={product} key={product._id} />
                            );
                        })}
                    </div>

                    <div className="card card-price card-shadow p-2">
                        <div className="card-body">
                            <div className="card-content">
                                <div className="card-section">
                                    <h2 className="fw-black">Price Details</h2>
                                </div>
                                <div className="card-section">
                                    <div className="card-row">
                                        <p>Prices ({totalQuantity} items)</p>
                                        <p>${normalPrice}</p>
                                    </div>
                                    <div className="card-row">
                                        <p>Discount</p>
                                        <p>${discountedPrice}</p>
                                    </div>
                                    <div className="card-row">
                                        <p>Delievery Charge</p>
                                        <p>$0</p>
                                    </div>
                                </div>
                                <div className="card-section">
                                    <div className="card-row fw-bold">
                                        <p>Total Amount</p>
                                        <p>${totalPrice}</p>
                                    </div>
                                </div>
                                <div className="save-text">
                                    <p>
                                        You will save ${discountedPrice} on this
                                        order
                                    </p>
                                </div>
                            </div>
                            <div className="card-actions text-s">
                                <button className="btn btn-primary">
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export { Cart };
