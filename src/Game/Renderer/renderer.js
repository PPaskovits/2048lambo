"use strict";

import Scene from './scene.js';
import Sprite from './sprite.js';

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 500;
        this.canvas.height = 500;
        this.context = this.canvas.getContext('2d');
        this.scene = new Scene();
    }

    createSprite(image) {
        var spriteImage = new Image();
        spriteImage.src = image;
        var sprite =  new Sprite(spriteImage);
        return sprite;
    }

    addToScene(object) {
        this.scene.addObject(object);
    }

    removeFromScene(object) {
        this.scene.removeObject(object);
    }

    render() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.scene.objects.forEach(object => {
            object.draw(this.context);
        });
    }

    getCanvasWidth() {
        return this.canvas.width;
    }

    getCanvasHeight() {
        return this.canvas.height;
    }

}

export default Renderer;