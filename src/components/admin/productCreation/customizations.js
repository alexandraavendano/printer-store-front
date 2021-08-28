import React, {useEffect, useState} from "react";
import {getProductsByType, saveProduct} from "../../helpers/externalCalls";
import {ProductCustomizations} from "./productCustomizations";

export function CustomizationForm(props) {
    const [products, setProducts] = useState([]);

    const setSelectedProducts = (e) => {

        const id = e.target.id;
        let m;
        if (props.product.customizable.length !== 0 && props.product.customizable.find(p => p.id.toString() === id)) {
            debugger
            console.log("eliminar")
            m = {
                ...props.product, customizable: props.product.customizable
                    .filter(p => p.id.toString() !== id)
                    .map(i => {return {id: i.id.toString()}})
            }
        } else {
            products.filter(p => p.id.toString() === e.target.id).map(p => props.product.customizable.push(p))
            m = {
                ...props.product, customizable: props.product.customizable.map(i => {
                    return {id: i.id.toString()}
                })
            }
        }
        saveProduct(m, props.setProduct);
    }

    useEffect(() => {
        getProductsByType(setProducts, "Raw")
    }, [props.category])

    if(props.product.customizable === undefined || products.length === 0 || products === undefined) return (<div/>)
    return (
        <div>
            <h1 style={{margin: 25}}>Customize your products</h1>
            <ProductCustomizations products={products} selectedProducts={props.product.customizable}
                                   setSelectedProducts={setSelectedProducts}/>
        </div>
    )
}