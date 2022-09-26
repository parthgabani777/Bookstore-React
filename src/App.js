import "./App.css";
import { Header } from "./components/header";
import {
    HomePage,
    Login,
    SignUp,
    Product,
    WishList,
    Cart,
    NotFound,
} from "./pages/Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mockman from "mockman-js";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mock" element={<Mockman />} />
                    <Route path="homePage" element={<HomePage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="product" element={<Product />} />
                    <Route path="wishlist" element={<WishList />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
