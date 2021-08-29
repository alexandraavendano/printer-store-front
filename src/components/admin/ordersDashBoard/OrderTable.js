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

    if (props.show === false || props.item.image === undefined || image === undefined) {
        return (<div/>);
    } else {
        return (
            <Modal
                size="lg"
                show={props.show}
                onHide={props.handleClose}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Update file #{props.item.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <a download={image.name} href={getImage(image)}>
                            <img src={getImage(image)} className="img-thumbnail"
                                 alt={"name"}
                                 style={{maxHeight: 450, maxWidth: 450}}
                                 key={image.id}/>
                        </a>
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

//TODO:
// Cambiar el estado de la orden
// Subir archivos OK
// Descargar archivos OK
export function ItemsTable(props) {
    const items = props.items;

    if (items === undefined || items.length === 0) {
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

                                {item.state.name}
                                {/*<div>*/}
                                {/*    <label>Category</label>*/}
                                {/*    <select className="form-select" name={"name"}*/}
                                {/*            onChange={(e) => props.handleProductTypeChange(e)}>*/}
                                {/*        {distinctName(props.productTypes).map(elm =>*/}
                                {/*            <option key={elm} value={elm} selected={props.product.type.name === elm}>{elm}</option>*/}
                                {/*        )}*/}
                                {/*    </select>*/}
                                {/*</div>*/}
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
                                <img src={getImage(item.image)} className="img-thumbnail" alt={"name"}
                                     style={{maxHeight: 150, maxWidth: 150}} key={item.image.id}
                                     onClick={() => props.handleShow(item)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        )
    }
}