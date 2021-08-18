export const getFirstImage = (image) => {
    if(image.length > 0) return getSrc(image[0]);
    else return require('../../images/not-found-image.jpg').default
}

export const getSrc = (image) => {
    const extension = image.name.split(".")[1];
    return `data:image/${extension};base64,`+ image.content;
}