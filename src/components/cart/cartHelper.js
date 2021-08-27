export function setCart(items) {
    localStorage.setItem("cart", JSON.stringify(items));
}

export function addToCart(item) {
    let cart = localStorage.getItem("cart");
    let updatedCart;

    if (cart == null) {
        updatedCart = [item];
    } else {
        const actualCart = getCartItems();
        actualCart.push(item)
        updatedCart = actualCart
    }

    setCart(updatedCart);
}

export function getCartItems() {
    const actualCart = JSON.parse(localStorage.getItem("cart")) ;
    return actualCart == null ? [] : actualCart;
}

export function deleteItem(items, itemIndexToDelete) {
    const updatedItems = items.filter((item, index) => index !== itemIndexToDelete);
    setCart(updatedItems);
    return updatedItems;
}