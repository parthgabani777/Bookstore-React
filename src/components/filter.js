function Filters({ filters, dispatchFilters, defaultValue }) {
    const { categories, rating, sort, price } = filters;

    return (
        <div className="sidebar box-shadow">
            <div className="sidebar-header">
                <span className="sidebar-title">Filters</span>
                <button
                    className="sidebar-clear"
                    onClick={() => {
                        dispatchFilters({
                            type: "Reset",
                            payload: { defaultValue },
                        });
                    }}
                >
                    Clear
                </button>
            </div>

            <div className="price">
                <p className="sidebar-subtitle">Price</p>

                <div className="input-group">
                    <input
                        type="range"
                        className="price-input"
                        min="100"
                        max="10000"
                        value={price}
                        onChange={(e) => {
                            dispatchFilters({
                                type: "Price_Filter",
                                payload: { price: e.target.value },
                            });
                        }}
                    />
                </div>
                <div className="price-label">
                    <label htmlFor="minprice">0</label>
                    <label htmlFor="currentprice">5000</label>
                    <label htmlFor="maxprice">10000</label>
                </div>
            </div>

            <div className="category">
                <p className="sidebar-subtitle">Category</p>
                <div>
                    {["history", "science", "technology", "fiction"].map(
                        (category) => {
                            return (
                                <div className="input-group" key={category}>
                                    <input
                                        type="checkbox"
                                        id={category}
                                        checked={categories[category]}
                                        onChange={(e) => {
                                            dispatchFilters({
                                                type: `Category_${category}`,
                                            });
                                        }}
                                    />
                                    <label htmlFor={category}>{category}</label>
                                </div>
                            );
                        }
                    )}
                </div>
            </div>

            <div className="rating-filter">
                <p className="sidebar-subtitle">Rating</p>
                <div>
                    {[4, 3, 2, 1].map((ratingItem) => {
                        return (
                            <div className="input-group" key={ratingItem}>
                                <input
                                    type="radio"
                                    name="rating"
                                    id={`rating${ratingItem}`}
                                    checked={rating == ratingItem}
                                    onChange={() => {
                                        dispatchFilters({
                                            type: "Rating_Filter",
                                            payload: { rating: ratingItem },
                                        });
                                    }}
                                />
                                <label htmlFor={`rating${ratingItem}`}>
                                    {ratingItem} star above
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="sortby">
                <p className="sidebar-subtitle">Sort by</p>
                <div className="input-group">
                    <input
                        type="radio"
                        name="sortby"
                        id="sorybylth"
                        checked={sort === "lowToHigh"}
                        onChange={() => {
                            dispatchFilters({
                                type: "Sort_LowToHigh",
                            });
                        }}
                    />
                    <label htmlFor="sorybylth">Price - Low to High</label>
                </div>

                <div className="input-group">
                    <input
                        type="radio"
                        name="sortby"
                        id="sorybyhtl"
                        checked={sort === "highToLow"}
                        onChange={() => {
                            dispatchFilters({
                                type: "Sort_HighToLow",
                            });
                        }}
                    />
                    <label htmlFor="sorybyhtl">Price - High to Low</label>
                </div>
            </div>
        </div>
    );
}

export default Filters;
