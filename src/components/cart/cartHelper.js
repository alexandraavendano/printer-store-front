export function setCart(items) {
    localStorage.setItem("cart", JSON.stringify(items));
}

export function addToCart(item) {
    let cart = localStorage.getItem("cart");

    let updatedCart;
    if (cart == null) {
        updatedCart = [item];
    } else {
        const parsedCART = getCartItems();
        parsedCART.push(item)
        updatedCart = parsedCART
    }

    setCart(updatedCart);
}

export function getCartItems() {
    const parsedCart = JSON.parse(localStorage.getItem("cart")) ;
    return parsedCart == null ? [] : parsedCart;
}

export function deleteItem(items, itemIndexToDelete) {
    const updatedItems = items.filter((item, index) => index !== itemIndexToDelete);
    setCart(updatedItems);
    return updatedItems;
}