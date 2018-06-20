"use strict";

import Sprite from './Renderer/sprite.js';
import { FadeAnimation } from './Renderer/animation.js';


class Grid {
    constructor(centerX, centerY) {
        this.bg = new Sprite("gridbg.png");
        this.bg.width = 450;
        this.bg.height = 450;
        this.bg.posX = centerX - this.bg.width/2;
        this.bg.posY = centerY -  this.bg.height/2;

        this.bg.alpha = 0;

        this.grid = new Sprite("grid.png");
        this.grid.width = 450;
        this.grid.height = 450;
        this.grid.posX = centerX - this.grid.width/2;
        this.grid.posY = centerY -  this.grid.height/2;

        this.grid.alpha = 0;

        this.animations = [];
    }
    
    get sprite() {
        return this.grid;
    }

    set sprite(sprite) {
        console.log("Invalid acces to sprite");
    }

    get spriteBG() {
        return this.bg;
    }

    set spriteBG(sprite) {
        console.log("Invalid acces to spriteBG");
    }

    get pivotX() {
        return this.grid.posX;
    }

    get pivotY() {
        return this.grid.posY;
    }

    hide() {
        this.grid.hide();
    }

    show() {
        this.grid.show();
    }

    gameStart(onFinished) {
        this.fadeOut(() => {
            console.log("start finished");
            this.bg.setImage("gridbg.png");
            this.grid.show();
            this.fadeIn(onFinished);
        });
    }

    gameWon() {
        this.fadeOut(() => {
            this.grid.hide();
            this.bg.setImage("gamewon.png");
            this.fadeIn();
        })
    }

    gameOver() {
        this.fadeOut(() => {
            this.grid.hide();
            this.bg.setImage("gameover.png");
            this.fadeIn();
        })
    }

    fadeIn(onFinished) {
        this.animations.push(new FadeAnimation(this.bg, 1, 0.05));
        this.animations.push(new FadeAnimation(this.grid, 1, 0.05, onFinished));
    }

    fadeOut(onFinished) {
        this.animations.push(new FadeAnimation(this.bg, 0, 0.05));
        this.animations.push(new FadeAnimation(this.grid, 0, 0.05, onFinished));
    }

    update () {
        this.animations.forEach(animation => animation.update());
        this.animations = this.animations.filter(animation => !animation.finished);
    }

    isAnimating () {
        return this.animations && this.animations.length;
    }

}

export default Grid;
