import React, {useEffect, useState} from "react";
import {getOrders} from "../../helpers/externalCalls";
import {ImageModal, ItemsTable} from "./OrderTable";

export function OrderDashBoard() {
    const [orders, setOrders] = useState([]);
    const [item, setItem] = useState({})
    const [refresh, setRefresh] = useState(false);

    const [show, setShow] = useState(false);

    const handleRefresh = () => setRefresh(!refresh);

    const handleClose = () => {
        handleRefresh();
        setShow(false);
    }

    const handleShow = (item) => {
        setItem(item);
        setShow(true);
    }

    useEffect(() => {
        getOrders(setOrders);
    }, [refresh]);

    if (orders.length === 0) {
        return (<div><strong>No orders yet! Keep it up ... they will come soon.</strong></div>)
    } else {
        return (
            <div className={"content-container"}>
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
                        <ItemsTable
                            items={order.items} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}/>
                    </div>
                )}
                <ImageModal show={show} item={item} handleClose={handleClose}/>
            </div>
        )
    }
}