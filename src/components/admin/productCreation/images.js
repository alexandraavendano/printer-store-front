import React, {useState} from "react";
import {getSrc} from "../../helpers/imageHelper";
import {saveImage, saveProduct} from "../../helpers/externalCalls";
import {InputImage} from "../../helpers/formHelper";

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
            <InputImage imageInputRef={imageInputRef} handleFiles={handleFiles} images={images} handleSubmit={handleSubmit} id={props.product.id} title={"Add more"} margin={35}/>
        </div>
    )
}