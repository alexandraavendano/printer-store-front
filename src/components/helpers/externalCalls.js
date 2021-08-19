const simpleGET = {
    method: 'GET'
}

export const getProducts = (setProducts) => {
    fetch(`http://localhost:8080/products/all`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProducts(result),
            (error) => console.log(error)
        )
}

export const getProductsById = (setProduct, id) => {
    fetch(`http://localhost:8080/products/${id}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}

export const getProductsByType = (setProduct, type) => {
    fetch(`http://localhost:8080/products?typeName=${type}`, simpleGET)
        .then(res => res.json())
        .then(
            (result) => setProduct(result),
            (error) => console.log(error)
        )
}
