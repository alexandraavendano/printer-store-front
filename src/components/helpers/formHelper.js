import {Carousel} from "react-responsive-carousel";
import {getSrc} from "./imageHelper";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import React from "react";

export function ProductImages(props) {
    return (
        <div>
            <Carousel className="images-container">
                {props.product.images.map(image =>
                    <div key={image.id}>
                        <img src={getSrc(image)} alt={image.name}/>
                    </div>
                )}
            </Carousel>
        </div>
    )
}

export function GroupButtons(props) {
    return (
        <div>
            {props.array.map(elm =>
                <input className={elm === props.selected ? "btn selected" : "btn btn-primary"} type="button" value={elm}
                       key={elm}
                       onClick={e => props.handleChange(e.target.value)}/>
            )}
        </div>
    )
}

export function DropMenuLabelInLine(props) {
    if (props.array.length === 0) return (<div/>);
    else {
        return (
            <div className="input-group mb-3">
                <label className="input-group-text" htmlFor="inputGroupSelect01">{props.title}</label>
                <DropMenuOptions array={props.array} handleChange={props.handleChange}/>
            </div>
        )
    }
}

export function DropMenuSimple(props) {
    return (
        <div>
            <label>{props.title}</label>
            <DropMenuOptions array={props.array} handleChange={props.handleChange}/>
        </div>
    )
}

function DropMenuOptions(props) {
    return (
        <select className="form-select form-select-sm" onChange={e => props.handleChange(e.target.value)}>
            {props.array.map(elm =>
                <option key={elm} value={elm}>{elm}</option>
            )}
        </select>
    )
}

export function DropMenu(props) {
    if (props.array.length === 0) return (<div/>);
    else {
        return (
            <div>
                <label>{props.title}</label>
                <select className="form-select form-select-sm"
                        onChange={e => props.handleChange(parseInt(e.target.value))}>
                    {props.array.map(elm =>
                        <option key={elm.id} value={elm.id}>{elm.name}</option>
                    )}
                </select>
            </div>
        )
    }
}

export function FloatingInput(props) {
    return (
        <div className="form-floating mb-3">
            <input
                type="text"
                className="form-control"
                id={props.id}
                onKeyPress={props.validFormat}
                maxLength={props.maxLength}
                value={props.value}
                onChange={(e) => props.handleChange(e.target.value)}/>
            <label htmlFor="cardNumber">{props.title}</label>
        </div>
    )
}

export function FloatingInputPassword(props) {
    return (
        <div className="form-floating mb-3">
            <input
                type="password"
                className="form-control"
                id={props.id}
                onKeyPress={props.validFormat}
                maxLength={props.maxLength}
                value={props.value}
                onChange={(e) => props.handleChange(e.target.value)}/>
            <label htmlFor="cardNumber">{props.title}</label>
        </div>
    )
}

export function SimpleInput(props) {
    return (
        <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">{props.title}</label>
            <input
                type="text"
                className="form-control"
                id={props.id}
                onKeyPress={props.validFormat}
                maxLength={props.maxLength}
                onChange={(e) => props.handleChange(e.target.value)}
            />
        </div>
    )
}


export function SimpleInput2(props) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor="inputGroupSelect01">{props.title}</label>
            <input
                type="text"
                className="form-control"
                id={props.title}
                maxLength={props.maxLength}
                name={props.name}
                value={props.value}
                onChange={(e) => props.handleChange(e)}
            />
        </div>
    )
}

export function InputImage(props) {
    return (
        <div>
            <label className={"form-label"} style={{marginTop: props.margin}}>{props.title}</label>
            <div className="input-group">
                <input type="file"
                       className="form-control"
                       id={props.id}
                       aria-describedby="inputGroupFileAddon04"
                       aria-label="Upload"
                       ref={props.imageInputRef}
                       onChange={(e) => props.handleFiles(e)}/>
                { props.images === null ||  props.images.length === 0
                    ? <button className="btn btn-outline-secondary" type="button" disabled>Upload</button>
                    : <button className="btn btn-outline-secondary" type="button" id={props.id}
                              onClick={(e) => props.handleSubmit(e)}>Upload
                    </button>
                }
            </div>
        </div>
    )
}