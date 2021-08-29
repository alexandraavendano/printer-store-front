export const getFirstImage = (images) => {
    if(images.length > 0) return getSrc(images[0]);
    else return require('../../images/not-found-image.jpg').default
}

export const getSrc = (image) => {
    const extension = image.name.split(".")[1];
    return `data:image/${extension};base64,`+ image.content;
}

export const getImage = (image) => {
    if(image.name !== undefined) return getSrc(image);
    else return require('../../images/not-found-image.jpg').default
}

export const getDesignOrDefaultImage = (item) => {
    if(item.image === null) {
        const itemsCustomizable = item.customizations.filter(i => i.type.name === "Customizable");
        if(itemsCustomizable.length === 0){
            return getFirstImage(item.customizations[0].images);
        } else {
            return getFirstImage(item.customizations.filter(i => i.type.name === "Customizable")[0].images);
        }
    } else {
        return getSrc(item.image);
    }
}