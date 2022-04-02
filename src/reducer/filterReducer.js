export const filterReducer = (state, action) => {
    switch (action.type) {
        case "Category_History":
            return {
                ...state,
                categories: {
                    ...state.categories,
                    history: !state.categories.history,
                },
            };

        case "Category_Technology":
            return {
                ...state,
                categories: {
                    ...state.categories,
                    technology: !state.categories.technology,
                },
            };

        case "Category_Science":
            return {
                ...state,
                categories: {
                    ...state.categories,
                    science: !state.categories.science,
                },
            };

        case "Category_Fiction":
            return {
                ...state,
                categories: {
                    ...state.categories,
                    fiction: !state.categories.fiction,
                },
            };

        case "Rating_Filter":
            return {
                ...state,
                rating: action.payload.rating,
            };

        case "Price_Filter":
            return {
                ...state,
                price: action.payload.price,
            };

        case "Sort_LowToHigh":
            return {
                ...state,
                sort: "lowToHigh",
            };

        case "Sort_HighToLow":
            return {
                ...state,
                sort: "highToLow",
            };

        case "Reset":
            return {
                ...action.payload.defaultValue,
            };
    }
};
