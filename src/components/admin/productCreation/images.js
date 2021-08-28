import React, {useState} from "react";
import {getSrc} from "../../helpers/imageHelper";
import {saveImage, saveProduct} from "../../helpers/externalCalls";

export function ImagesForm(props) {
    const [images, setImages] = useState([]);
    const imageInputRef = React.useRef();

    const handleFiles = (e) => {
        setImages(e.target.files);
    }

    const handleSubmit = (e) => {
        if (images != null) {
            saveImage(images).then(image => {
                props.product.images.push(image)
                let h = {
                    ...props.product, images: props.product.images.map(i => {
                        return {id: i.id}
                    })
                }
                return saveProduct(h, props.setProduct)
            })
        }
        imageInputRef.current.value = "";
        setImages([])
        e.preventDefault();
    }

    if (props.product === undefined || props.product.images === undefined) return <div/>
    return (
        <div>
            <h1 style={{margin: 25}}>Product Images</h1>
            {props.product.images.map(image =>
                <img src={getSrc(image)} className="img-thumbnail" alt={"name"}
                     style={{maxHeight: 150, maxWidth: 150}} key={image.id}/>
            )}

            <div>
                <label className={"form-label"} style={{marginTop: 30}}>Add more</label>
                <div className="input-group">
                    <input type="file"
                           className="form-control"
                           id="inputGroupFile04"
                           aria-describedby="inputGroupFileAddon04"
                           aria-label="Upload"
                           ref={imageInputRef}
                           onChange={(e) => handleFiles(e)}/>
                    {images === null || images.length === 0
                        ? <button className="btn btn-outline-secondary" type="button" disabled>Upload</button>
                        : <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
                                  onClick={(e) => handleSubmit(e)}>Upload
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}