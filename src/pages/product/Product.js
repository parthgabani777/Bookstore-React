import axios from "axios";
import { React, useEffect, useState, useReducer } from "react";
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
import { findItems } from "../../utils/utils";
import "./product.css";

function Product() {
    const [products] = useProduct();

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

    const priceFilteredItems = filterPriceRange(products, price);
    const categoryFilteredItems = filterByCategory(
        priceFilteredItems,
        categories
    );
    const ratingFilteredItems = filterByRating(categoryFilteredItems, rating);
    const sortedItems = sortItems(ratingFilteredItems, sort);

    return (
        <section className="product-main">
            <Filters
                filters={filters}
                dispatchFilters={dispatchFilters}
                defaultValue={defaultValue}
            />

            <div className="card-container p-2">
                {sortedItems.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </section>
    );
}

export { Product };
