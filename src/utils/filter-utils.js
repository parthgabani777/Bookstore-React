const sortLowToHigh = (items) => {
    return [...items.sort((first, second) => first.price - second.price)];
};

const sortHighToLow = (items) => {
    return [...items.sort((first, second) => second.price - first.price)];
};

const sortItems = (items, sortType) => {
    switch (sortType) {
        case "lowToHigh":
            return sortLowToHigh(items);
        case "highToLow":
            return sortHighToLow(items);
        default:
            return items;
    }
};

const filterPriceRange = (items, filterPrice) => {
    return items.filter((item) => {
        return parseInt(item.price) <= filterPrice;
    });
};

const filterByRating = (items, rating) => {
    return items.filter((item) => {
        return item.rating >= rating;
    });
};

const filterByCategory = (items, categories) => {
    const isCategoryChecked = Object.values(categories).find(
        (category) => category
    );

    return isCategoryChecked
        ? items.filter((item) => {
              return categories[item.categoryName];
          })
        : items;
};

export {
    sortLowToHigh,
    sortHighToLow,
    filterPriceRange,
    filterByCategory,
    filterByRating,
    sortItems,
};
