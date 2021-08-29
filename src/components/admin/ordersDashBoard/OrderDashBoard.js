import React, {useEffect, useState} from "react";
import {getOrders, getStates, saveItem, saveOrderWithoutSet} from "../../helpers/externalCalls";
import {ImageModal, ItemsTable} from "./OrderTable";

export function OrderDashBoard() {
    const [orders, setOrders] = useState([]);
    const [item, setItem] = useState({})
    const [states, setStates] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [show, setShow] = useState(false);
    const [editStatus, setEditStatus] = useState(false);

    const handleRefresh = () => {
        setEditStatus(!editStatus);
        setRefresh(!refresh);
    }

    const handleClose = () => {
        handleRefresh();
        setShow(false);
    }

    const handleShow = (item) => {
        setItem(item);
        setShow(true);
    }

    const handleOrderStatusChange = (e, order) => {
        const {name, value} = e.target;
        order[name] = {name:value};
        saveOrderWithoutSet(order).then(() =>handleRefresh());
    }

    const handleItemStatusChange = (e, item) => {
        const {name, value} = e.target;
        item[name] = {name:value};
        saveItem(item).then(() => handleRefresh());
    }

    useEffect(() => {
        getOrders(setOrders);
        getStates(setStates);
    }, [refresh]);

    if (orders.length === 0) {
        return (<div><strong>No orders yet! Keep it up ... they will come soon.</strong></div>)
    } else {
        return (
            <div className={"content-container"}>
                {orders.map(order =>
                    <div key={order.id} className="card" style={{marginTop: 25}}>
                        <div className={"card-header"}>
                            <div className="row align-items-start">
                                <div className="col-2">
                                    <strong>#{order.id}</strong>
                                </div>
                                <div className="col-6">
                                    {editStatus
                                        ? <div>
                                            <select className="form-select" value={order.state.name} name={"state"}
                                                    onChange={(e) => handleOrderStatusChange(e, order)}>
                                                {states.map(elm =>
                                                    <option key={elm.name} value={elm.name}>{elm.name}</option>
                                                )}
                                            </select>
                                          </div>
                                        : <div onClick={() => setEditStatus(true)}>Status: {order.state.name}</div>
                                    }
                                </div>
                                <div className="col-4">
                                    <span>Creation Date: {new Date(order.date).toLocaleDateString()} </span>
                                </div>
                            </div>
                        </div>
                        <ItemsTable key={order.id} items={order.items} show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow} states={states} handleStatusChange={handleItemStatusChange}/>
                    </div>
                )}
                <ImageModal show={show} item={item} handleClose={handleClose}/>
            </div>
        )
    }
}