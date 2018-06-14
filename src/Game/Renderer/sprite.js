"use strict";

class Sprite {
    constructor(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;
        this._posX = 0;
        this._posY = 0;
        this._width = 0;
        this._height = 0;
    }

    get posX() {
        return this._posX;
    }

    set posX(posX) {
        this._posX = posX;
    }

    get posY() {
        return this._posY;
    }

    set posY(posY) {
        this._posY = posY;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._width;
    }

    set height(height) {
        this._height = height;
    }

    draw(context) {
        context.drawImage(this.image, this._posX, this._posY, this._width, this._height);
    }
}

export default Sprite;