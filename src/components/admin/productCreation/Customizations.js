import React from "react";
import {ProductTable} from "../productDashboard/productTable";

export function CustomizationForm(props) {
    return(
        <div>
            Customize your products
            <ProductTable products={props.product.customizable}/>
        </div>
    )
}