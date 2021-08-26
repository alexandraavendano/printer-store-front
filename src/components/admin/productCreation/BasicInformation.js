import {SimpleInput2} from "../../helpers/formHelper";
import React from "react";

export function BasicInformationForm(props) {
    return (
        <div>
            <h1>Basic Product Information</h1>
            <SimpleInput2 title={"Name"} name={"name"} value={props.product.name} handleChange={props.handleChange}
                          maxLength={"25"}/>
            <SimpleInput2 title={"Description"} name={"description"} value={props.product.description}
                          handleChange={props.handleChange} maxLength={"100"}/>
            <SimpleInput2 title={"Price"} name={"price"} value={props.product.price} handleChange={props.handleChange}
                          maxLength={"20"}/>
            <button className="btn btn-primary" style={{float: "right", marginTop: 25}}>Save Changes</button>
        </div>
    )
}