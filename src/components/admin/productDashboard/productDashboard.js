import React, {useEffect, useState} from "react";
import {Spinner} from "react-bootstrap";
import {deleteEmployee, getProducts} from "../../helpers/externalCalls";
import {SearchBar} from "../../common/searchBar";

import {ProductTable} from "./productTable";

//TODO:
// Add search button functionality OK
// Create add OK
// Edit
// Delete button. OK
export default function ProductDashboard() {
    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedProducts, setSelectedProducts] = useState(new Set());
    const [show, setShow] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => setRefresh(!refresh);
    const handleClose = () => {
        handleRefresh();
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleSelectedProducts = (e) => {
        const employeeId = e.target.value;
        selectedProducts.has(employeeId) ? selectedProducts.delete(employeeId) : selectedProducts.add(employeeId);
        setSelectedProducts(selectedProducts);
    }

    const handleDelete = () => {
        for (let employee of selectedProducts) {
            deleteEmployee(handleRefresh, employee)
        }
    }

    useEffect(() => {getProducts( setProducts)}, [refresh, query])

    if (products === null) {
        return (<Spinner animation="border"/>)
    } else {
        return (
            <div>
                <SearchBar query={query} setQuery={setQuery}/>
                <ProductTable products={products} setSelectedProducts={handleSelectedProducts}/>
                <div>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleShow}>Add product
                    </button>
                    <button type="button" className="btn btn-secondary btn-sm" onClick={handleDelete}
                            style={{marginLeft: 15}}>Delete
                    </button>
                </div>
                {/*<CreateEmployeeModal show={show} handleClose={handleClose}/>*/}
            </div>
        )
    }
}