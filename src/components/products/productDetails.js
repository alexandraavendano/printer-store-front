import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getProductsById} from "../helpers/externalCalls";
import {ProductImages} from "./productFormHelpers";
import {ProductCustomizationForm} from "./productForm";

function ProductInformation(props) {
    return (
        <div>
            <h1>{props.product.name}</h1>
            <span>{props.product.description}</span><br/>
            <h5>Price: ${props.product.price}</h5>
            <ProductCustomizationForm product={props.product} setRedirectToCart={props.setRedirectToCart}/>
        </div>
    )
}

export default function ProductDetails(props) {
    let id = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => getProductsById(setProduct, id.id), [id.id])

    if (product != null) {
        return (
            <div className="product-detail-container">
                <ProductImages product={product}/>
                <ProductInformation product={product} setRedirectToCart={props.setRedirectToCart}/>
            </div>
        )
    } else {
        return (<div> Loading ...</div>)
    }
}