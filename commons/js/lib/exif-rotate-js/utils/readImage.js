"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function readImage(src) {
    const img = new Image();
    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
        img.src = src;
    });
}
exports.readImage = readImage;
