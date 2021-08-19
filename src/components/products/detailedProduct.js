import {useParams} from "react-router";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {useEffect, useState} from "react";
import {getProductsById} from "../helpers/externalCalls";
import {getSrc} from "../helpers/imageHelper";

function ProductImages(props) {
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

function GroupButtons(props) {
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

function DropMenuSimple(props) {
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

function DropMenu(props) {
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

const sizes = ["1.7'x3", "2.5'x4", "4'x4'", "2.5'x10'", "2.5'x12", "4'x6"]
const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100, 250]


function addCart(item)  {
    let cart = localStorage.getItem("cart");
    let updatedCart;
    if(cart == null){
        updatedCart = [item];
    } else {
        const parsedCART = JSON.parse(cart);
        parsedCART.push(item)
        updatedCart = parsedCART
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
}

function customizedProduct(product, quantity, size, material, structure, setDesignItem) {
    const sizes = size.split("x");
    const height = sizes[0];
    const width = sizes[1];

    const item = {
        id: product.id,
        height: height,
        width: width,
        quantity: quantity,
        products: [
            {id: material},
            {id: structure}
        ]
    }

    //addCart(item);
    setDesignItem(item);
}

function ProductCustomizable(props) {
    const [quantity, setQuantity] = useState(quantities[0]);
    const [size, setSize] = useState(sizes[0]);
    const hasCustomizable = props.product.customizable != null;
    const materials = hasCustomizable ? props.product.customizable.filter(p => p.type.subType === 'Material') : []
    const structures = hasCustomizable ? props.product.customizable.filter(p => p.type.subType === 'Structure') : []
    const [material, setMaterial] = useState(materials.length === 0 ? 0 : materials[0].id);
    const [structure, setStructures] = useState(structures.length === 0 ? 0 : structures[0].id);

    return (
        <div className="product-configuration">
            <form onSubmit={() => customizedProduct(props.product, quantity, size, material, structure, props.setDesignItem)}>
                <h5>Size</h5>
                <GroupButtons array={sizes} handleChange={setSize} selected={size}/>
                <DropMenu array={materials} handleChange={setMaterial} title={"Materials"}/>
                <DropMenu array={structures} handleChange={setStructures} title={"Structures"}/>
                <DropMenuSimple array={quantities} handleChange={setQuantity} title={"Quantity"}/>
                <button type="submit" className="btn btn-primary"> Design </button>
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
            <ProductCustomizable product={props.product} setDesignItem={props.setDesignItem}/>
        </div>
    )
}

export default function DetailedProduct() {
    let id = useParams();
    const [product, setProduct] = useState(null);
    const [designItem, setDesignItem] = useState(null);

    useEffect(() => getProductsById(setProduct, id.id), [id.id])

    if(designItem != null) {
        return (
            <div>
                <h1>Design section</h1>
                <h1>{designItem.quantity}</h1>
            </div>
        )
    } else if (product != null) {
        return (
            <div className="product-detail-container">
                <ProductImages product={product}/>
                <ProductDetails product={product} setDesignItem={setDesignItem}/>
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