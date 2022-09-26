import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./context/product-context";
import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call make Server
// makeServer();

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <WishlistProvider>
                        <App />
                        <ToastContainer
                            style={{
                                fontSize: 16,
                            }}
                            position={"bottom-right"}
                            autoClose={2000}
                            theme="dark"
                        />
                    </WishlistProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
