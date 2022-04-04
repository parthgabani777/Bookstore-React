import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { ProductProvider } from "./context/product-context";
import { AuthProvider } from "./context/auth-context";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <ProductProvider>
                <App />
            </ProductProvider>
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
