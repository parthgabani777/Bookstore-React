const findItems = (items, findItem) => {
    return items.find((item) => item.id === findItem.id);
};

export { findItems };
