import React, {useState} from "react";
import {getOrderByUser} from "../helpers/externalCalls";
import {getUserName} from "../helpers/dtos";
import CustomAlert from "../common/customAlert";
import {ItemDetails} from "./itemDetails";

function Order(props) {
    const order = props.order;
    const date = new Date(order.date);

    return (
        <div className="card" style={{marginTop: 25}}>
            <div className={"card-header"}>
                <div className="row align-items-start">
                    <div className="col">
                        <h4>#{order.id}</h4>
                    </div>
                    <div className="col">
                        <span>Order Status: {order.state.name}</span>
                    </div>
                    <div className="col">
                        <span>Date Order : {date.toLocaleDateString()} </span>
                    </div>
                </div>
            </div>

            {order.items.map((item, index) =>
                <ItemDetails key={index} item={item} index={index}/>
            )}
        </div>
    )
}

function Orders() {
    const [orders, setOrder] = useState(null);
    if (orders == null) getOrderByUser(setOrder, getUserName())

    if (orders != null && orders.length !== 0) {
        debugger
        return (
            <div>
                <h1>Orders History</h1>
                <div className={"content-container"}>
                    {orders.map(order =>
                        <Order order={order}/>
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <CustomAlert
                isError={false}
                successMessage={"Wow, such empty... Try to create at least one order first!"}
                link={{"url": "/products", "title": "Check out our products"}}
            />
        )
    }
}

export default Orders;