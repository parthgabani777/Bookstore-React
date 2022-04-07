import axios from "axios";
import { React, useEffect, useState, useReducer } from "react";
import { useLocation } from "react-router";
import ProductCard from "../../components/card/product-card";
import Filters from "../../components/filter";
import { useProduct } from "../../context/product-context";
import { filterReducer } from "../../reducer/filterReducer";
import {
    filterPriceRange,
    filterByCategory,
    filterByRating,
    sortItems,
} from "../../utils/filter-utils";
import "./product.css";

function Product() {
    const [products] = useProduct();
    const { state: category } = useLocation();

    useEffect(() => {
        category &&
            dispatchFilters({
                type: `Category_${category}`,
            });
        window.scrollTo(0, 0);
    }, []);

    const defaultValue = {
        categories: {
            technology: false,
            fiction: false,
            history: false,
            science: false,
        },
        rating: 0,
        sort: false,
        price: 10000,
    };

    const [filters, dispatchFilters] = useReducer(filterReducer, defaultValue);
    const { categories, rating, sort, price } = filters;

    const filteredItems = sortItems(
        filterByRating(
            filterByCategory(filterPriceRange(products, price), categories),
            rating
        ),
        sort
    );

    return (
        <section className="product-main">
            <Filters
                filters={filters}
                dispatchFilters={dispatchFilters}
                defaultValue={defaultValue}
            />

            <div className="card-container p-2">
                {filteredItems.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
}

export { Product };
