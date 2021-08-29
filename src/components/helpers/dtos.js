import jwt_decode from "jwt-decode";

export function getRole() {
    try {
        const token = localStorage.getItem("token");
        return jwt_decode(token).role;
    } catch (e) {
        return null;
    }
}

export function getUserName() {
    try {
        const token = localStorage.getItem("token");
        return jwt_decode(token).sub;
    } catch (e) {
        return null;
    }
}

function itemsDTO() {
    const cart = JSON.parse(localStorage.getItem("cart"));

    return cart.map(item => {
            const customizations = item.customizations.map(c => {
                return {id: c.id}
            })

            let itemDTO = {
                height: item.height,
                width: item.width,
                price: item.price,
                quantity: item.quantity,
                state: {
                    name: "Ready to Print"
                },
                designNotes: item.designIdeas,
                customizations: [...customizations, {id: item.id}],
            };

            if (item.hasCustomDesign) itemDTO["image"] = item.image;

            return itemDTO;
        }
    )
}

export function orderDTO() {
    return {
        items: itemsDTO(),
        state: {
            name: "Ready to Print"
        },
        client: {
            email: getUserName(),
        }
    };
}


function getCustomizableObject(product, id) {
    return product.customizable.find(c => c.id === id);
}

export function cartItemDTO(product, quantity, height, width, material, structure, customizedImageId, designIdeas) {
    const isCustomDesign = customizedImageId !== -1;
    const imageId = isCustomDesign ? customizedImageId : product.images[0].id;

    let item = {
        id: product.id,
        name: product.name,
        price: product.price,
        height: height,
        width: width,
        quantity: quantity,
        image: {id: imageId},
        designIdeas: designIdeas,
        customizations: [],
        hasCustomDesign: isCustomDesign
    };

    if (structure !== -1) item.customizations.push(getCustomizableObject(product, structure));
    if (material !== -1) item.customizations.push(getCustomizableObject(product, material));

    return item;
}