import React from "react";
import {Link} from "react-router-dom";

export function ProductTable(props) {
    const products = props.products;

    return (
        <div className={"table-container"}>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Edit</th>
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    <tr key={product.id}>
                        <td>
                            <input className="form-check-input" type="checkbox" value={product.id}
                                   id="flexCheckDefault" onClick={(e) => props.setSelectedProducts(e)}/>
                        </td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.type.name} - {product.type.subType}</td>
                        <td>
                            <Link push to={`/admin/products/${product.id}`}>
                                <button type="button" className="btn btn-primary">Update</button>
                            </Link>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}