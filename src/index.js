import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./context/product-context";
import { AuthProvider } from "./context/auth-context";
import { CartProvider } from "./context/cart-context";
import { WishlistProvider } from "./context/wishlist-context";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ProductProvider>
                <CartProvider>
                    <WishlistProvider>
                        <App />
                    </WishlistProvider>
                </CartProvider>
            </ProductProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
