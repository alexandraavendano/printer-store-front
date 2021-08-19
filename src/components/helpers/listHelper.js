export default function distinct(products) {
    return [...new Set(products.map(p => p.type.subType))] //Spread syntax
}