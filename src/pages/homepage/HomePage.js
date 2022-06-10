import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeCard from "../../components/card/home-card";
import "./home.css";
import { useProduct } from "../../context/product-context";

function HomePage() {
    const [products] = useProduct();

    return (
        <main className="home">
            <section className="landing text-l">
                <div className="landing-content">
                    <p className="fw-bold text-white text-center">
                        Get access to books 1000+ books in many category and
                        from variety of publisher.
                    </p>
                    <Link
                        to="/product"
                        className="btn btn-secondary br-3 landing-btn"
                    >
                        Buy Now
                    </Link>
                </div>
            </section>

            <section className="category p-2">
                <p className="text-l fw-bold text-center p-2">
                    Search By Category
                </p>
                <div className="category-container">
                    <Link
                        to="/product"
                        state="technology"
                        className="category-card text-l box-shadow card-tech"
                    >
                        <p>Technology</p>
                    </Link>
                    <Link
                        to="/product"
                        state="science"
                        className="category-card text-l box-shadow card-science"
                    >
                        <p>Science</p>
                    </Link>
                    <Link
                        to="/product"
                        state="fiction"
                        className="category-card text-l box-shadow card-fiction"
                    >
                        <p>Fiction</p>
                    </Link>
                    <Link
                        to="/product"
                        state="history"
                        className="category-card text-l box-shadow card-history"
                    >
                        <p>History</p>
                    </Link>
                </div>
            </section>

            <section className="best-seller p-2">
                <p className="text-l fw-bold text-center p-2">Best Seller</p>
                <div className="card-container">
                    {products.map((product, index) =>
                        index < 2 ? (
                            <HomeCard product={product} key={product.id} />
                        ) : (
                            ""
                        )
                    )}
                </div>
            </section>
        </main>
    );
}

export { HomePage };
