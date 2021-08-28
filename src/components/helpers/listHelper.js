export function distinct(products) {
    return [...new Set(products.map(p => p.type.subType))] //Spread syntax
}

export function distinctName(subTypes) {
    return [...new Set(subTypes.map(p => p.name))]
}

export function distinctSubType(subTypes) {
    return [...new Set(subTypes.map(p => p.subType))]
}