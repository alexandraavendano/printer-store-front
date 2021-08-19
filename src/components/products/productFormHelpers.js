import {Carousel} from "react-responsive-carousel";
import {getSrc} from "../helpers/imageHelper";
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

export function DropMenuSimple(props) {
    return (
        <div>
            <label>{props.title}</label>
            <select className="form-select form-select-sm" onChange={e => props.handleChange(e.target.value)}>
                {props.array.map(elm =>
                    <option key={elm} value={elm}>{elm}</option>
                )}
            </select>
        </div>
    )
}

export function DropMenu(props) {
    if (props.array.length === 0) return (<div/>);
    else {
        return (
            <div>
                <label>{props.title}</label>
                <select className="form-select form-select-sm" onChange={e => props.handleChange(e.target.value)}>
                    {props.array.map(elm =>
                        <option key={elm.id} value={elm.id}>{elm.name}</option>
                    )}
                </select>
            </div>
        )
    }
}