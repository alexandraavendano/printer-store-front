const simpleGET = {
    method: 'GET'
}

const simplePost = (body) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer' + localStorage.getItem("token"),
        },
        body: body
    };
}

const getWithAuthorization = {
    method: 'GET',
    headers: {
        'Authorization' : 'Bearer' + localStorage.getItem("token"),
    },
}

//-------------- PRODUCTS
export function getProducts(setProducts) {
    fetch(`http://localhost:8080/products/all`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProducts(result),
            (error) => console.log(error)
        )
}

export function  getProductsById (setProduct, id) {
    fetch(`http://localhost:8080/products/${id}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export function getProductsByType (setProduct, type) {
    fetch(`http://localhost:8080/products?typeName=${type}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

//-------------- PAYMENT
export function savePayment(setPayment, body) {
    fetch("http://localhost:8080/users/payments", simplePost(JSON.stringify(body)))
        .then(res => res.json())
        .then(
            (result) => setPayment(true),
            (error) => console.log(error)
        )
}

//-------------- ORDERS
export function saveOrder(setOrder, body) {
    fetch("http://localhost:8080/users/orders", simplePost(JSON.stringify(body)))
        .then(res => res.json())
        .then(
            (result) => setOrder(true),
            (error) => console.log(error)
        )
}

export function  getOrderByUser (setOrder, id) {
    return fetch(`http://localhost:8080/users/orders/${id}`, getWithAuthorization)
        .then(res => res.json())
        .then(
            (result) => setOrder(result),
            (error) => console.log(error)
        )
}