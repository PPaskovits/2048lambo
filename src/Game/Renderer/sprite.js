"use strict";

class Sprite {
    constructor(imagePath) {
        this.image = new Image();
        this.image.src = imagePath;
        this._posX = 0;
        this._posY = 0;
        this._width = 0;
        this._height = 0;
        this.visible = true;
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
        if (!this.visible)
            return;

        context.drawImage(this.image, this._posX, this._posY, this._width, this._height);
    }

    setImage(imagePath) {
        if (this.image) {
            this.image.src = imagePath;
        }
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}

export default Sprite;