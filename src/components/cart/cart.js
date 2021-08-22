import {getCartItems} from "./cartHelper";
import './cart.css';
import CustomAlert from "../common/customAlert";
import React, {useState} from "react";
import {getSrc} from "../helpers/imageHelper";

function getPrice(item){
    let price;
    price = item.product.customizable()
}

function ItemDetails(props) {
    const item = props.item;
    const imageSrc = item.image.url == null ? getSrc(item.product.images[0]) : item.image.url;
    const customizable = item.product.customizable.filter(c => item.products.map(p => p.id).includes(c.id.toString()));
    const removeItem = (e) => {
        props.setItems(props.items.filter((item, index) => index === props.index ))
        e.preventDefault();
    }

    return (
        <div key={props.index} className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4"> <img src={imageSrc} className="img-fluid rounded-start"/> </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h3 className="card-title">{item.product.name}</h3><br/>
                        <p className="card-text">
                            <div className="row align-items-center">
                                <div className="col">
                                    <span><strong>Quantity </strong> {item.quantity}</span><br/>
                                    <span><strong>Height </strong> {item.height}</span> - <span><strong>Width </strong>{item.width}</span><br/>
                                    {item.designIdeas != null && item.designIdeas !== "" ?
                                        <span><strong>Design Notes </strong>{item.designIdeas}</span> :
                                        <div>Uploaded Design</div>}<br/>
                                </div>
                                <div className="col">
                                    {customizable.map(additional =>
                                        <div key={additional.id}>
                                            <strong>{additional.type.subType}:</strong> {additional.name}</div>
                                    )}
                                </div>
                            </div>
                        </p>
                        <div className="row">
                            <div className="col-8">
                                <button type="button" className="btn btn-secondary btn-sm" onClick={ (e) => removeItem(e)}>Delete</button>
                            </div>
                            <div className="col-4">
                                <strong>USD ${item.product.price}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Price(props) {
    return (
        <li className="list-group-item">
            <div className="row">
                <div className="col-lg-8 col-md-6 col-sm-6 col-8"> {props.item.product.name} </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-4"> ${props.item.product.price * props.item.quantity} </div>
            </div>
        </li>
    )
}

function Total(props){
    return(
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
    return (
        <ul className="list-group list-group-flush">
            {props.items.map(item =>
                <Price item={item}/>
            )}
            <li className="list-group-item">
                <Total title={"Subtotal"} amount={1000}/>
                <Total title={"Total"} amount={1000}/>
            </li>
        </ul>
    )
}

export function Cart() {
    const [items, setItems] = useState(getCartItems);
    if (items.length === 0 || items == null) {
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
                                <ItemDetails item={item} setItems={setItems} index={index}/>
                            )}
                        </div>
                        <div className="col-sm-4">
                            <h2>Summary</h2>
                            <Prices items={items}/>
                        </div>
                    </div>
                </div>
            </div>
        )}
}