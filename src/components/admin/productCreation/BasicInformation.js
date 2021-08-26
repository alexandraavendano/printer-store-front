import {DropMenuSimple, SimpleInput2} from "../../helpers/formHelper";
import React, {useState} from "react";

//TODO: Añadir alerta de verificación de guardado
export function BasicInformationForm(props) {
    const [productType, setProductType] = useState();

    if(props.productTypes === undefined) return <div/>
    return (
        <div>
            <h1 style={{marginTop: 25, marginBottom:25}}>Basic Product Information</h1>
            <SimpleInput2 title={"Name"} name={"name"} value={props.product.name} handleChange={props.handleChange}
                          maxLength={"25"}/>
            <SimpleInput2 title={"Description"} name={"description"} value={props.product.description}
                          handleChange={props.handleChange} maxLength={"100"}/>
            <SimpleInput2 title={"Price"} name={"price"} value={props.product.price} handleChange={props.handleChange}
                          maxLength={"20"}/>
            <DropMenuSimple array={props.productTypes.map(p => p.subType + " " + p.name)} handleChange={setProductType} title={"Type"}/>
            <button className="btn btn-primary" style={{float: "right", marginTop: 25}} onClick={props.handleSave}>Save Changes</button>
        </div>
    )
}