import {getCartItems} from "./cartHelper";
import './cart.css';
import CustomAlert from "../common/customAlert";
import React from "react";

function ItemDetails(props) {
    const item = props.item;

    return (
        <div>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={item.url} className="img-fluid rounded-start"/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{item.product.name}</h5>
                            <p className="card-text">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span>Quantity : {item.quantity}</span><br/>
                                        <span>Height: {item.height}</span><br/>
                                        <span>Width: {item.width}</span><br/>
                                        <span>Price: {item.product.price}</span><br/>
                                    </div>
                                    <div className="col">
                                        <span>Design Notes: {item.product.designIdeas}</span><br/>
                                        {item.products.map(additionals =>
                                            <div key={additionals}>Additional products: {additionals.id}</div>
                                        )}
                                    </div>
                                </div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Cart() {
    const items = getCartItems();
    return (
        <div className="cart-list">

            {items.length === 0 ?
                <CustomAlert
                    isError={false}
                    successMessage={"Wow, such empty... Try to add some products first!"}
                    link={{"url": "/products", "title": "Check out our products"}}
                /> : <h1>Shopping cart</h1>
            }
            {items.map(item =>
                <ItemDetails item={item}/>
            )
            }

        </div>
    )
}