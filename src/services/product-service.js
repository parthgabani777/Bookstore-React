import axios from "axios";

const getProducts = async () => {
    try {
        const { data } = await axios.get("/api/products1");
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { getProducts };
