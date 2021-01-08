"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getImages_1 = require("./utils/getImages");
const options_1 = require("./options");
const getBrowserOrientation_1 = require("./utils/getBrowserOrientation");
exports.getBase64Strings = async (files, { maxSize = options_1.defaultOptions.maxSize, quality = options_1.defaultOptions.quality } = {}) => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
        throw new Error('canvas can not created');
    }
    const images = await getImages_1.getImages(files);
    const hasBrowserOrientation = await getBrowserOrientation_1.getBrowserOrientation();
    if (hasBrowserOrientation) {
        const base64s = images.map((image) => {
            const { width, height } = getImages_1.getSize(image.width, image.height, maxSize);
            canvas.setAttribute('width', `${width}px`);
            canvas.setAttribute('height', `${height}px`);
            context.drawImage(image, 0, 0, width, height);
            return canvas.toDataURL('image/jpeg', quality);
        });
        return base64s;
    }
    const base64s = images.map((image) => {
        const orientation = getImages_1.getOrientation(image);
        const { width, height } = getImages_1.getSize(orientation > 4 ? image.height : image.width, orientation > 4 ? image.width : image.height, maxSize);
        canvas.setAttribute('width', `${width}px`);
        canvas.setAttribute('height', `${height}px`);
        const { translate, scale, rotate } = getImages_1.getCanvasOptions(width, height, orientation);
        context.translate(translate.x, translate.y);
        context.scale(scale.x, scale.y);
        context.rotate(rotate.angle);
        // exif orientation values > 4 correspond to portrait orientation.
        // width and height parameters must be swapped for landscape to ensure correct image display
        if (orientation > 4) {
            context.drawImage(image, 0, 0, height, width);
        }
        else {
            context.drawImage(image, 0, 0, width, height);
        }
        return canvas.toDataURL('image/jpeg', quality);
    });
    return base64s;
};
