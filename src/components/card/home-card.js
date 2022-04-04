import { Link } from "react-router-dom";
import { findItems } from "../../utils/utils";
import { useCart } from "../../context/cart-context";

function HomeCard({ product }) {
    const { cart, dispatchCart } = useCart();

    return (
        <div className="card card-horizontal card-shadow">
            <div className="card-img">
                <img src={product.image} alt="Image" />
            </div>
            <div className="card-body">
                <div className="card-content p-1">
                    <div className="fw-semibold text-s">{product.title}</div>
                    <div className="fw-bold text-m">${product.price}</div>
                    <div className="text-s py-2">{product.description}</div>
                </div>
                <div className="card-actions p-1 text-s">
                    {findItems(cart.itemInCart, product) ? (
                        <button className="btn btn-primary">
                            <Link to="/cart">Go To Cart</Link>
                        </button>
                    ) : (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                dispatchCart({
                                    type: "ADD_TO_CART",
                                    payload: { product },
                                });
                            }}
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomeCard;
