const simpleGET = {
    method: 'GET'
}

const simplePost = (body) => {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("token"),
        },
        body: JSON.stringify(body)
    };
}

const multipartPost = (body) => {
    return {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem("token"),
        },
        body: body
    };
}

const getWithAuthorization = () => {
    return {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem("token"),
        }
    };
}

const deleteWithAuthorization = () => {
    return {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer' + localStorage.getItem("token"),
        }
    };
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

export function getProductsById(setProduct, id) {
    fetch(`http://localhost:8080/products/${id}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export function getProductsByType(setProduct, type) {
    fetch(`http://localhost:8080/products?typeName=${type}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export function saveProduct(body, setProduct) {
    return fetch("http://localhost:8080/products", simplePost(JSON.stringify(body)))
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export function saveProductWithoutJson(body, setProduct) {
    return fetch("http://localhost:8080/products", simplePost(body))
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export function getProductType(setProductTypes) {
    return fetch("http://localhost:8080/products/productTypes", getWithAuthorization())
        .then(res => res.json())
        .then(
            (result) => setProductTypes(result),
            (error) => console.log(error)
        )
}

//-------------- IMAGES
export function saveImage(fileInput) {
    const imageData = new FormData();
    imageData.append('images', fileInput[0])
    return fetch("http://localhost:8080/images", multipartPost(imageData))
        .then(res => res.json())
        .then(
            (result) => result,
            (error) => console.log(error)
        )
}

export function getImageById(setImage, imageId) {
    fetch(`http://localhost:8080/images?id=${imageId}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setImage(result),
            (error) => console.log(error)
        )
}

//-------------- PAYMENT
export function savePayment(body) {
    return fetch("http://localhost:8080/users/payments", simplePost(body))
        .then(res => res.json())
        .then(
            (result) => console.log(result),
            (error) => console.log(error)
        )
}

//-------------- ORDERS
export function saveOrder(setOrder, body) {
    return fetch("http://localhost:8080/users/orders", simplePost(body))
        .then(res => res.json())
        .then(
            (result) => setOrder(true),
            (error) => console.log(error)
        )
}

export function getOrderByUser(setOrder, id) {
    return fetch(`http://localhost:8080/users/orders/${id}`, getWithAuthorization())
        .then(res => res.json())
        .then(
            (result) => setOrder(result),
            (error) => console.log(error)
        )
}

//-------------- EMPLOYEE
export function saveEmployee(isSuccess, body) {
    fetch('http://localhost:8080/employees/signup', simplePost(body))
        .then(res => res.json())
        .then(
            (result) => isSuccess("true"),
            (error) => isSuccess("false")
        )
}

export function getEmployees(url, setEmployees) {
    return fetch(url, getWithAuthorization())
        .then(res => res.json())
        .then(
            (result) => setEmployees(result),
            (error) => console.log(error)
        )
}

export function deleteEmployee(setRefresh, id) {
    fetch(`http://localhost:8080/employees/${id}`, deleteWithAuthorization())
        .then(res => setRefresh())
}