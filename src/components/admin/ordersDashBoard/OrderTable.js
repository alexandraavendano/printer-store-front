import React, {useEffect, useState} from "react";
import {getImage} from "../../helpers/imageHelper";
import {InputImage} from "../../helpers/formHelper";
import {getItem, saveImage, saveItem} from "../../helpers/externalCalls";
import {Modal} from "react-bootstrap";

export function ImageModal(props) {
    const imageInputRef = React.useRef();
    const [images, setImages] = useState([]);
    const [image, setImage] = useState({});

    const updateItem = (item) => {
        setImage(item.image)
    }

    const handleFiles = (e) => {
        setImages(e.target.files);
    }

    const handleSubmit = (e) => {
        if (images != null) {
            saveImage(images).then(image => {
                props.item["image"] = {id: image.id};
                return saveItem(props.item);
            }).then(item => setImage(item.image));
        }
        imageInputRef.current.value = "";
        e.preventDefault();
    }

    useEffect(() => {
        if (props.item.id !== undefined) {
            getItem(props.item.id, updateItem)
        }
    }, [props.item.id])

    if (props.show === false ) {
        return (<div/>);
    } else {
        return (
            <Modal
                show={props.show}
                onHide={props.handleClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="ImageModal">
                        Update image - Item #{props.item.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        {props.item.image === null || props.item.image === undefined || image === undefined || image === null
                            ? <div/>
                            : <a download={image.name} href={getImage(image)}>
                                <img src={getImage(image)} className="img-thumbnail"
                                     alt={"name"}
                                     style={{maxHeight: 450, maxWidth: 450}}
                                     key={image.id}/>
                            </a>
                        }

                        <InputImage imageInputRef={imageInputRef} handleFiles={handleFiles}
                                    images={images}
                                    handleSubmit={handleSubmit} id={props.item.id} title={""}
                                    margin={0}/>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

export function ItemsTable(props) {
    const items = props.items;
    if (items === undefined || items.length === 0 || props.states === []) {
        return <div/>
    } else {
        return (
            <div>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Qt</th>
                        <th>Height</th>
                        <th>Width</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Customizations</th>
                        <th>Image</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items.map(item =>
                        <tr key={item.id}>
                            <td>{item.quantity}</td>
                            <td>{item.height}</td>
                            <td>{item.width}</td>
                            <td>
                                <div>
                                    <select className="form-select form-select-sm" value={item.state.name} name={"state"} onChange={(e) => props.handleStatusChange(e, item)}>
                                        {props.states.map(elm =>
                                            <option key={elm.name} value={elm.name}>{elm.name}</option>
                                        )}
                                    </select>
                                </div>
                            </td>
                            <td>{item.designNotes}</td>
                            <td>
                                <ul className="list-group list-group-flush">
                                    {item.customizations.map(c =>
                                        <li key={c.id} className="list-group-item">{c.name + "-" + c.type.subType}</li>
                                    )}
                                </ul>
                            </td>
                            <td>
                                { item.image === null
                                    ? <button className={"btn btn-primary"} onClick={() => props.handleShow(item)}>Update</button>
                                    : <img src={getImage(item.image)} className="img-thumbnail" alt={"name"}
                                          style={{maxHeight: 150, maxWidth: 150}} key={item.image.id}
                                          onClick={() => props.handleShow(item)}/>
                                }
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}