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

    localStorage.setItem("cart", JSON.stringify(updatedCart));
}

export function getCartItems() {
    const parsedCart = JSON.parse(localStorage.getItem("cart")) ;
    return parsedCart == null ? [] : parsedCart;
}

