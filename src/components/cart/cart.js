import {getCartItems} from "./cartHelper";
import './cart.css';
import CustomAlert from "../common/customAlert";
import React from "react";
import {getSrc} from "../helpers/imageHelper";

function ItemDetails(props) {
    const item = props.item;
    const imageSrc = item.image.url == null ? getSrc(item.product.images[0]) : item.image.url;

    const customizable = item.product.customizable.filter(c => item.products.map(p => p.id).includes(c.id.toString()));

    return (
        <div key={item}>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={imageSrc} className="img-fluid rounded-start"/>
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
                                        {item.product.designIdeas ? <span>Design Notes: {item.product.designIdeas}</span> : <div/> }<br/>
                                        {customizable.map(additional =>
                                            <div key={additional.id}>{additional.type.subType}: {additional.name}</div>
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
    if (items.length === 0) {
        return (
            <CustomAlert
                isError={false}
                successMessage={"Wow, such empty... Try to add some products first!"}
                link={{"url": "/products", "title": "Check out our products"}}
            />)
    } else {
        return (
            <div className="cart-list">
                {items.length === 0 ?
                    <CustomAlert
                        isError={false}
                        successMessage={"Wow, such empty... Try to add some products first!"}
                        link={{"url": "/products", "title": "Check out our products"}}
                    /> : <h1>Shopping cart</h1>}
                {items.map(item =>
                    <ItemDetails item={item}/>
                )}
            </div>
        )
    }
}