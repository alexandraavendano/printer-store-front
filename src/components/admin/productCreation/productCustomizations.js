import React from "react";

export function ProductCustomizations(props) {
    const products = props.products;

    if (products === undefined || products.customizable){
        return <div/>
    }
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
                </tr>
                </thead>
                <tbody>
                {products.map(product =>
                    <tr key={product.id}>
                        <td>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                defaultChecked={props.selectedProducts ? props.selectedProducts.find(p => p.id === product.id) : false}
                                value={product}
                                id={product.id}
                                onClick={(e) => props.setSelectedProducts(e)}/>
                        </td>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        <td>{product.type.name} - {product.type.subType}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    )
}