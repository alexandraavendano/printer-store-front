import React, {useState} from "react";
import {getSrc} from "../../helpers/imageHelper";
import {saveImage, saveProduct, saveProduct2} from "../../helpers/externalCalls";

export function ImagesForm(props) {
    const [images, setImages] = useState([]);
    const [image, savedImage] = useState({});

//     useEffect(() => {
//          //if(image.id !== undefined && props.product.images.find(i => i.id === image.id) === undefined ) {
//         //     props.product.images.push(image)
//         //     props.handleImageChange(props.product.images);
// //             setImages([])
//          }
//     }, [image, props], )

    const handleFiles = (e) => {
        setImages(e.target.files);
    }

    const handleSubmit = (e) => {
        if (images != null) {
            saveImage(images, savedImage).then(image => {
                props.product.images.push(image)
                let h = {
                    ...props.product, images: props.product.images.map(i => {
                        return {id: i.id}
                    })
                }

                saveProduct2(h, props.setProduct)
            })
        }
        e.preventDefault();
    }

    if(props.product === undefined || props.product.images === undefined) return <div/>
    return (
        <div>
            <h1 style={{marginBottom: 25}}>Images</h1>
            {props.product.images.map(image =>
                <img src={getSrc(image)} className="img-thumbnail" alt={"name"}
                     style={{maxHeight: 150, maxWidth: 150}} key={image.id}/>
            )}

            <div className="input-group" style={{marginTop: 30}}>
                <input type="file" className="form-control" id="inputGroupFile04"
                       aria-describedby="inputGroupFileAddon04" aria-label="Upload" onChange={(e) => handleFiles(e)}/>
                <button className="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04"
                        onClick={(e) => handleSubmit(e)}>Upload
                </button>
            </div>

            {/*<div className="mb-3">*/}
            {/*    <label htmlFor="designFile" className="form-label">Please upload your design</label>*/}
            {/*    <input className={"form-control"} type="file" id="designFile" onChange={(e) => handleFiles(e)}/>*/}
            {/*</div>*/}


        </div>
    )
}