import {SimpleInput2} from "../../helpers/formHelper";
import {distinctName, distinctSubType} from "../../helpers/listHelper";
import React from "react";

export function BasicInformationForm(props) {
    if (props.productTypes === undefined || props.product.type === undefined) return <div/>
    return (
        <div>
            <h2 style={{marginTop: 25, marginBottom: 25}}>Basic Product Information {props.product.id === undefined ? <div/> : <div># {props.product.id}</div> } </h2>

            <SimpleInput2 title={"Name"} name={"name"} value={props.product.name} handleChange={props.handleChange}
                          maxLength={"25"}/>
            <SimpleInput2 title={"Description"} name={"description"} value={props.product.description}
                          handleChange={props.handleChange} maxLength={"100"}/>
            <div className="row">
                <div className="col">
                    <label>Price</label>
                    <div className="input-group mb-3">
                        <span className="input-group-text">$</span>
                        <input type="text" className="form-control" placeholder="Username" aria-label="Username"
                               aria-describedby="basic-addon1" name={"price"} value={props.product.price}
                               onChange={props.handleChange}/>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label>Category</label>
                        <select className="form-select" name={"name"} value={props.product.type.name}
                                onChange={(e) => props.handleProductTypeChange(e)}>
                            {distinctName(props.productTypes).map(elm =>
                                <option key={elm} value={elm} >{elm}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="col">
                    <div>
                        <label>Sub Category</label>
                        <select className="form-select" aria-label="Default select example" name={"subType"} value={props.product.type.subType}
                                onChange={(e) => props.handleProductTypeChange(e)}>
                            {distinctSubType(props.productTypes).map(elm =>
                                <option key={elm} value={elm}>{elm}</option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" style={{float: "right", marginTop: 25}} onClick={props.handleSave}>Save
                Changes
            </button>
        </div>
    )
}