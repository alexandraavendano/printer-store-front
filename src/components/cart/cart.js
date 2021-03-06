import {deleteItem, getCartItems} from "./cartHelper";
import './cart.css';
import CustomAlert from "../common/customAlert";
import React, {useEffect, useState} from "react";
import {getSrc} from "../helpers/imageHelper";
import {getRole} from "../helpers/dtos";
import {getImageById} from "../helpers/externalCalls";

function getPrice(item) {
    let unitPrice = item.price * item.quantity;
    let customizablePrice =  item.customizations.length === 0 ? 0 : item.customizations.map(c => c.price).reduce((acc, actual) => acc + actual);                      // Customizable are how much each addition is going to cost more.

    return unitPrice + customizablePrice;
}

function getSubTotal(items) {
    return items.map(item => getPrice(item)).reduce((acc, actual) => acc + actual);
}

function ItemDetails(props) {
    const item = props.item;

    const [image, setImage] = useState({});
    const customizations = item.customizations;
    const removeItem = (e) => {
        props.setItems(deleteItem(props.items, props.index))
        e.preventDefault();
    }

    useEffect(() => getImageById(setImage, props.item.image.id), [props.item])

    if(image.name === undefined) {
        return (<div/>)
    } else {
        return (
            <div key={props.index} className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4"><img src={getSrc(image)} className="img-fluid rounded-start"
                                                   alt={item.name}/></div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{item.name}</h3><br/>
                            <div className="card-text">
                                <div className="row align-items-center">
                                    <div className="col">
                                        <span><strong>Quantity </strong> {item.quantity}</span><br/>
                                        <span><strong>Height </strong> {item.height}</span> - <span><strong>Width </strong>{item.width}</span><br/>
                                        {item.designIdeas != null && item.designIdeas !== "" ?
                                            <span><strong>Design Notes </strong>{item.designIdeas}</span> :
                                            <div>Uploaded Design</div>}<br/>
                                    </div>
                                    <div className="col">
                                        {customizations.map(additional =>
                                            <div key={additional.id}>
                                                <strong>{additional.type.subType}:</strong> {additional.name}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <button type="button" className="btn btn-secondary bold-button btn-sm"
                                            onClick={(e) => removeItem(e)}>Delete
                                    </button>
                                </div>
                                <div className="col-4">
                                    <strong>USD ${getPrice(props.item)}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function Price(props) {
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-6 col-8"> {props.item.name} </div>
                <div
                    className="col-lg-4 col-md-6 col-sm-6 col-4"> ${getPrice(props.item)} </div>
            </div>
        </li>
    )
}

function Total(props) {
    return (
        <li className={"list-group"}>
            <div className="row">
                <div className="col-lg-5 col-md-2 col-sm-2 col-4"/>
                <div className="col-lg-3 col-md-4 col-md-4 col-4 alignRight"><strong>{props.title}</strong></div>
                <div className="col-lg-4 col-md-6 col-md-6 col-4">${props.amount}</div>
            </div>
        </li>
    )
}

function Prices(props) {
    const subtotal = getSubTotal(props.items);
    const total = Math.round((subtotal * 1.10 + Number.EPSILON) * 100) / 100;
    return (
        <ul className="list-group list-group-flush">
            {props.items.map((item, index) =>
                <Price key={index} item={item}/>
            )}

                <Total title={"Subtotal"} amount={subtotal}/>
                <Total title={"Total"} amount={total}/>

        </ul>
    )
}

export function Cart() {
    const [items, setItems] = useState(getCartItems);
    const isEmpty = items.length === 0 || items === null
    const role = getRole();

    if (isEmpty) {
        return (
            <CustomAlert
                isError={false}
                successMessage={"Wow, such empty... Try to add some products first!"}
                link={{"url": "/products", "title": "Check out our products"}}
            />
        )
    } else {
        return (
            <div className="cart-list">
                <h1>Shopping cart</h1>
                <div className="container">
                    <div className="row justify-content-md-center">
                        <div className="col-sm-8">
                            {items.map((item, index) =>
                                <ItemDetails key={index} item={item} items={items} setItems={setItems} index={index}/>
                            )}
                        </div>
                        <div className="col-sm-4">
                            <h2>Summary</h2>
                            <Prices items={items}/>
                            <div className="d-grid gap-2">
                                { role === "ROLE_CLIENT" || role == null
                                    ? <a className="btn btn-primary" href="/payment" role="button">Check out!</a>
                                    : <a className="btn btn-primary disabled" href="/payment" role="button">Check out!</a>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}