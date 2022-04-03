import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "../services/product-service";

const defaultProductValue = [];

const productContext = createContext();

const useProduct = () => useContext(productContext);

const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(defaultProductValue);

    useEffect(async () => {
        const data = await getProducts();
        setProducts(data.products);
    }, []);

    return (
        <productContext.Provider value={[products, setProducts]}>
            {children}
        </productContext.Provider>
    );
};

export { ProductProvider, useProduct };
