import React from "react";
import {ProductTable} from "../productDashboard/productTable";

export function CustomizationForm(props) {
    debugger
    return(
        <div>
            Customize your products
            <ProductTable products={props.product.customizable}/>
        </div>
    )
}