import { Link } from "react-router-dom";
import { findItems } from "../../utils/utils";

function ProductCard({ product }) {
    return (
        <div className="card card-badge badge-icon box-shadow">
            <i className="fas fa-heart badge badge-top-right text-m"></i>

            <div className="card-img">
                <img src={product.image} alt="Image" />
            </div>
            <div className="card-body">
                <div className="card-content p-1">
                    <div className="fw-semibold text-s">{product.title}</div>
                    <div className="fw-bold text-m">${product.price}</div>
                </div>
                <div className="card-actions p-1 text-s">
                    <button className="btn btn-secondary">Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
