import React from "react";
import {Link} from "react-router-dom";

export function ProductTable(props) {
    const products = props.products;

    if (products === undefined) return <div/>
    return (
        <div className={"table-container"} style={{marginBottom:15}}>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>

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