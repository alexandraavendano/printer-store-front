import {DropMenu, DropMenuSimple, GroupButtons} from "../helpers/formHelper";
import React, {useState} from "react";
import {CollapseDesign} from "./productDesign";
import {addToCart} from "../cart/cartHelper";

const sizes = ["1.7'x3", "2.5'x4", "4'x4'", "2.5'x10'", "2.5'x12", "4'x6"]
const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 25, 50, 100, 250]

function imageToObject(image) {
    if(image == null){
        return {};
    } else {
        const imageData = new FormData();
        Array.from(image).forEach((file, i) => {
            imageData.append(i, file)
        })

        return {
            url: URL.createObjectURL(image[0]),
            data: imageData,
        };
    }
}

function getCustomizableObject(product, id) {
    return product.customizable.find(c => c.id === id);
}

//TODO: Add design to the customizations if the seign is not ready.
function customizedProduct(product, quantity, size, material, structure, image, designIdeas) {
    const sizes = size.split("x");
    const height = sizes[0];
    const width = sizes[1];

    const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        originalImage: product.images[0],
        height: height,
        width: width,
        quantity: quantity,
        image: imageToObject(image),
        designIdeas: designIdeas,
        customizations: [
            getCustomizableObject(product, material),
            getCustomizableObject(product, structure)
        ]
    }

    addToCart(item);
}

export function ProductCustomizationForm(props) {
    const [quantity, setQuantity] = useState(quantities[0]);
    const [size, setSize] = useState(sizes[0]);
    const hasCustomizable = props.product.customizable != null;
    const materials = hasCustomizable ? props.product.customizable.filter(p => p.type.subType === 'Material') : []
    const structures = hasCustomizable ? props.product.customizable.filter(p => p.type.subType === 'Structure') : []
    const [material, setMaterial] = useState(materials.length === 0 ? -1 : materials[0].id);
    const [structure, setStructures] = useState(structures.length === 0 ? -1 : structures[0].id);
    const [image, setImages] = useState(null);
    const [designIdeas, setDesignIdeas] = useState("");
    const [isDesignValid, setIsDesignValid] = useState(null);

    const onSubmit = (e) => {
        if(image == null && designIdeas === "") {
            setIsDesignValid(false);
        } else {
            customizedProduct(props.product, quantity, size, material, structure, image, designIdeas);
            setIsDesignValid(true);
            props.setRedirectToCart(true);
        }
        e.preventDefault();
    }

    return (
        <div className="product-configuration">
            <form onSubmit={(e) => onSubmit(e)}>
                <h5>Size</h5>
                <GroupButtons array={sizes} handleChange={setSize} selected={size}/>
                <DropMenu array={materials} handleChange={setMaterial} title={"Materials"}/>
                <DropMenu array={structures} handleChange={setStructures} title={"Structures"}/>
                <DropMenuSimple array={quantities} handleChange={setQuantity} title={"Quantity"}/>
                <CollapseDesign image={image} setImages={setImages} designIdeas={designIdeas} setDesignIdeas={setDesignIdeas} isDesignValid={isDesignValid} setIsDesignValid={setIsDesignValid}/>
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="bold-button btn btn-primary" type="submit">Add cart</button>
                </div>
            </form>
        </div>
    )
}