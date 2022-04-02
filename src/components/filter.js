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
                        class="price-input"
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
                <div class="price-label">
                    <label htmlFor="minprice">0</label>
                    <label htmlFor="currentprice">5000</label>
                    <label htmlFor="maxprice">10000</label>
                </div>
            </div>

            <div className="category">
                <p className="sidebar-subtitle">Category</p>
                <div>
                    <div className="input-group">
                        <input
                            type="checkbox"
                            id="history"
                            checked={categories.history}
                            onChange={(e) => {
                                dispatchFilters({
                                    type: "Category_History",
                                });
                            }}
                        />
                        <label htmlFor="history">History</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="checkbox"
                            id="science"
                            checked={categories.science}
                            onChange={(e) => {
                                dispatchFilters({
                                    type: "Category_Science",
                                });
                            }}
                        />
                        <label htmlFor="science">Science</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="checkbox"
                            id="technology"
                            checked={categories.technology}
                            onChange={(e) => {
                                dispatchFilters({
                                    type: "Category_Technology",
                                });
                            }}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="checkbox"
                            id="fiction"
                            checked={categories.fiction}
                            onChange={(e) => {
                                dispatchFilters({
                                    type: "Category_Fiction",
                                });
                            }}
                        />
                        <label htmlFor="fiction">Fiction</label>
                    </div>
                </div>
            </div>

            <div className="rating">
                <p className="sidebar-subtitle">Rating</p>
                <div>
                    <div className="input-group">
                        <input
                            type="radio"
                            name="rating"
                            id="rating4"
                            checked={rating == 4}
                            onChange={() => {
                                dispatchFilters({
                                    type: "Rating_Filter",
                                    payload: { rating: 4 },
                                });
                            }}
                        />
                        <label htmlFor="rating4">4 star above</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="radio"
                            name="rating"
                            id="rating3"
                            checked={rating == 3}
                            onChange={() => {
                                dispatchFilters({
                                    type: "Rating_Filter",
                                    payload: { rating: 3 },
                                });
                            }}
                        />
                        <label htmlFor="rating3">3 star above</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="radio"
                            name="rating"
                            id="rating2"
                            checked={rating == 2}
                            onChange={() => {
                                dispatchFilters({
                                    type: "Rating_Filter",
                                    payload: { rating: 2 },
                                });
                            }}
                        />
                        <label htmlFor="rating2">2 star above</label>
                    </div>

                    <div className="input-group">
                        <input
                            type="radio"
                            name="rating"
                            id="rating1"
                            checked={rating == 1}
                            onChange={() => {
                                dispatchFilters({
                                    type: "Rating_Filter",
                                    payload: { rating: 1 },
                                });
                            }}
                        />
                        <label htmlFor="rating1">1 star above</label>
                    </div>
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
