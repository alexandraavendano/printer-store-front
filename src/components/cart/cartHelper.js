export function addCart(item) {
    let cart = localStorage.getItem("cart");
    let updatedCart;
    if (cart == null) {
        updatedCart = [item];
    } else {
        const parsedCART = JSON.parse(cart);
        parsedCART.push(item)
        updatedCart = parsedCART
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
}
