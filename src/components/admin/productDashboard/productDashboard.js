import React, {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {getProductsByQuery} from "../../helpers/externalCalls";
import {SearchBar} from "../../common/searchBar";
import {ProductTable} from "./productTable";
import {Link} from "react-router-dom";

export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(new Set());

    const handleSelectedProducts = (e) => {
        const employeeId = e.target.value;
        selectedProducts.has(employeeId) ? selectedProducts.delete(employeeId) : selectedProducts.add(employeeId);
        setSelectedProducts(selectedProducts);
    }

    useEffect(() => {
        const url = "http://localhost:8080/products/all";
        const urlQuery = query !== "" ? url + `?query=${query}` : url
        getProductsByQuery(urlQuery, setProducts);
    }, [query])

    if (products === null) {
        return (<Spinner animation="border"/>)
    } else {
        return (
            <div>
                <SearchBar query={query} setQuery={setQuery}/>
                <ProductTable products={products} setSelectedProducts={handleSelectedProducts}/>
                <Link push to={"/admin/products/create"}>
                    <button type="button" className="btn btn-secondary btn-sm">Add Product</button>
                </Link>
            </div>
        )
    }
}