const findItems = (items, findItem) => {
    return items.find((item) => item._id === findItem._id);
};

const priceAfterDiscountCalculator = (price, discount) => {
    return price * ((100 - discount) / 100);
};

const discountPriceCalculator = (price, discount) => {
    return price * (discount / 100);
};

export { findItems, discountPriceCalculator, priceAfterDiscountCalculator };
