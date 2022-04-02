import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HomeCard from "../components/home-card";
import "../css/home.css";
import { getProducts } from "../services/product-service";

function HomePage() {
    const [product, setProducts] = useState([]);

    useEffect(async () => {
        const data = await getProducts();
        setProducts(data.products);
    }, []);

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
                    <div className="category-card text-l box-shadow card-tech">
                        <p>Technology</p>
                    </div>
                    <div className="category-card text-l box-shadow card-science">
                        <p>Science</p>
                    </div>
                    <div className="category-card text-l box-shadow card-fiction">
                        <p>Fiction</p>
                    </div>
                    <div className="category-card text-l box-shadow card-history">
                        <p>History</p>
                    </div>
                </div>
            </section>

            <section className="best-seller p-2">
                <p className="text-l fw-bold text-center p-2">Best Seller</p>
                <div className="card-container">
                    {product.map((item, index) =>
                        index < 2 ? <HomeCard item={item} key={item.id} /> : ""
                    )}
                </div>
            </section>
        </main>
    );
}

export { HomePage };
