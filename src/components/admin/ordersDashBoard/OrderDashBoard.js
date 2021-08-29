import React, {useEffect, useState} from "react";
import {getOrders} from "../../helpers/externalCalls";
import {ItemsTable} from "./OrderTable";

export function OrderDashBoard() {
    const [orders, setOrders] = useState([]);

    useEffect(() => getOrders(setOrders), [])

    if (orders.length === 0) {
        return (<div><strong>No orders yet! Keep it up ... they will come soon.</strong></div>)
    } else {
        return (
            <div>
                {orders.map(order =>
                    <div className="card" style={{marginTop: 25}}>
                        <div className={"card-header"}>
                            <div className="row align-items-start">
                                <div className="col-2">
                                    <strong>#{order.id}</strong>
                                </div>
                                <div className="col-6">
                                    <span>Status: {order.state.name}</span>
                                </div>
                                <div className="col-4">
                                    <span>Creation Date: {new Date(order.date).toLocaleDateString()} </span>
                                </div>
                            </div>
                        </div>
                        <ItemsTable item={order.items} order={order}/>
                    </div>
                )}
            </div>
        )
    }


}