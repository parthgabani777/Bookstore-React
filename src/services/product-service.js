import axios from "axios";

const getProducts = async () => {
    try {
        const { data } = await axios.get("/api/products");
        return data;
    } catch {
        console.log(error);
    }
};

export { getProducts };
