const findItems = (items, findItem) => {
    return items.find((item) => item.id === findItem.id);
};

const priceAfterDiscountCalculator = (price, discount) => {
    return price * ((100 - discount) / 100);
};

const discountPriceCalculator = (price, discount) => {
    return price * (discount / 100);
};

export { findItems, discountPriceCalculator, priceAfterDiscountCalculator };
