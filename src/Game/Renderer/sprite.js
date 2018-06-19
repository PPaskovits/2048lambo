"use strict";

class Sprite {
    constructor(imageName) {
        this.image = assetManager.getImage(imageName);
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
        return this._height;
    }

    set height(height) {
        this._height = height;
    }

    resize(width, height) {
        var centerX = this.posX + this.width/2;
        var centerY = this.posY + this.height/2;
        this.posX = centerX - width/2;
        this.posY = centerY - height/2;
        this.width = width;
        this.height = height;
    }

    draw(context) {
        if (!this.visible)
            return;

        context.drawImage(this.image, this._posX, this._posY, this._width, this._height);
    }

    setImage(imageName) {
        this.image = assetManager.getImage(imageName);
    }

    hide() {
        this.visible = false;
    }

    show() {
        this.visible = true;
    }
}

export default Sprite;