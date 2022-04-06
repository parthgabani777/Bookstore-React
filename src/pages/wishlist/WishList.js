import { React, useEffect } from "react";
import { useNavigate } from "react-router";
import ProductCard from "../../components/card/product-card";
import { useAuth } from "../../context/auth-context";
import { useWishlist } from "../../context/wishlist-context";
import "./wishlist.css";

function WishList() {
    const { wishlist, dispatchWishlist } = useWishlist();
    const { itemInWishlist } = wishlist;
    const { auth } = useAuth();
    const navigation = useNavigate();

    useEffect(() => {
        auth.isAuthorized || navigation("/login");
    }, []);

    return (
        <section className="main">
            <h1 className="text-center text-l p-2">
                My Wishlist ({itemInWishlist.length})
            </h1>

            <div className="card-container p-2">
                {itemInWishlist.map((item) => (
                    <ProductCard product={item} />
                ))}
            </div>
        </section>
    );
}

export { WishList };
