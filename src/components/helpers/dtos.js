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
            return {
                height: item.height,
                width: item.width,
                price: item.price,
                quantity: item.quantity,
                state: {
                    name: "Ready to Print"
                },
                image: {
                    id: 1,
                },
                customizations: [...customizations,{id: item.id}]
            };
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