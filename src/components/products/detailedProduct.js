import {useParams} from "react-router";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useEffect, useState} from "react";
import {getProductsById} from "../helpers/externalCalls";
import {getSrc} from "../helpers/imageHelper";
import {Link} from "react-router-dom";

function ProductImages(props) {
    return (
        <div>
            <Carousel className="images-container">
                {props.product.images.map(image =>
                    <div>
                        <img src={getSrc(image)} alt={image.name} key={image.name}/>
                    </div>
                )}
            </Carousel>
        </div>
    )
}

function GroupButtons(props) {
    return (
        <div>
            {props.array.map(elm =>
                <input
                    className="btn btn-primary"
                    type="button"
                    value={elm}
                    key={elm}
                    onChange={props.handleChange}/>
            )}
        </div>
    )
}

function DropMenu(props) {
    return (
        <div>
            <select className="form-select form-select-sm" onChange={props.handleChange}>
                {props.array.map(elm =>
                    <option key={elm} value={elm.toString()}>{elm}</option>
                )}
            </select>
        </div>
    )
}

function customizedProduct(props) {
    const item = {
        quantity: props.quantity,
        size: props.size,
        products: [
            {id: props.product.id},
            {id: props.material.id},
            {id: props.structure.id}
        ]
    }

    JSON.stringify(item);
}

const sizes = ["1.7'x3", "2.5'x4", "4'x4'", "2.5'x10'", "2.5'x12", "4'x6"]
const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100, 250]

function ProductCustomizable(props) {
    const [quantity, setQuantity] = useState(quantities[0]);
    const [size, setSize] = useState(sizes[0]);
    const [material, setMaterial] = useState(props.materials[0]);
    const [structure, setStructures] = useState(props.structures[0]);

    return (
        <div className="product-configuration">
            <form>
                <h5>Size</h5>
                <GroupButtons array={sizes} handleChange={setSize}/>
                {props.materials ? <div/> :
                    <div>
                        <h5>Materials</h5>
                        <DropMenu array={props.materials.map(m => m.name)} handleChange={setMaterial}/>
                    </div>
                }
                {props.structures ? <div/> : <div>
                    <h5>Structure</h5>
                    <DropMenu array={props.structures.map(m => m.name)} handleChange={setStructures}/>
                </div>
                }
                <h5>Quantity</h5>
                <DropMenu array={quantities} handleChange={setQuantity}/>
                <Link to={`products/design`}>
                    <button type="submit" className="btn btn-primary">
                        Design
                    </button>
                </Link>
            </form>
        </div>
    )
}

function ProductDetails(props) {
    return (
        <div>
            <h1>{props.product.name}</h1>
            <span>{props.product.description}</span><br/>
            <h5>Price: ${props.product.price}</h5>
            <ProductCustomizable materials={props.materials} structures={props.structures}/>
        </div>
    )
}

//TODO: Improve getProductsId
export default function DetailedProduct() {
    let id = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchData1() {
            await getProductsById(setProduct, id.id);
        }

        fetchData1()
    }, [id.id],)

    if (product != null) {
        const materials = product.customizable ? [] : product.customizable.filter(p => p.type.subType === 'Material')
        const structures = product.customizable ? [] : product.customizable.filter(p => p.type.subType === 'Structure')

        return (
            <div className="product-detail-container">
                <ProductImages product={product}/>
                <ProductDetails product={product} materials={materials} structures={structures}/>

            </div>
        )
    } else {
        return (
            <div>
                Loading ...
            </div>
        )
    }
}