import React, {useEffect, useState} from "react";
import {getProductsByType, saveProductWithoutJson} from "../../helpers/externalCalls";
import {ProductCustomizations} from "./productCustomizations";

export function CustomizationForm(props) {
    const [products, setProducts] = useState([]);

    const setSelectedProducts = (e) => {
        const id = e.target.id;
        let m;
        if (props.product.customizable.find(p => p.id === id)) {
            debugger
            console.log("eliminar")
            m = {
                ...props.product, customizable: props.product.customizable
                    .filter(p => p.id !== id)
                    .map(i => {return {id: i.id}})
            }
        } else {
            console.log("añadir")
            props.product.customizable.push(e.target.value)

            m = {
                ...props.product, customizable: props.product.customizable.map(i => {
                    return {id: i.id}
                })
            }
        }
        saveProductWithoutJson(m, props.setProduct);
    }
    useEffect(() => {
        getProductsByType(setProducts, "Raw")
    }, [props.category])


    return (
        <div>
            <h1 style={{margin: 25}}>Customize your products</h1>
            <ProductCustomizations products={products} selectedProducts={props.product.customizable}
                                   setSelectedProducts={setSelectedProducts}/>
        </div>
    )
}