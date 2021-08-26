import React from "react";
import {getSrc} from "../../helpers/imageHelper";

export function ImagesForm(props) {
    return (
        <div>
            <h1 style={{marginBottom: 25}}>Images</h1>
            {props.product.images.map(image =>
                <img src={getSrc(image)} className="img-thumbnail" alt={"name"} style={{maxHeight: 150, maxWidth: 150}}/>
            )}

            <div className="input-group" style={{marginTop: 30}}>
                <input type="file" className="form-control" id="inputGroupFile04"
                       aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04">Upload</button>
            </div>
        </div>
    )
}