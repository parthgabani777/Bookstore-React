import axios from "axios";
import { toast } from "react-toastify";

const getProducts = async () => {
    try {
        const { data } = await axios.get("/products");
        return data;
    } catch (error) {
        toast.error("Item can not be fetched.");
    }
};

export { getProducts };
