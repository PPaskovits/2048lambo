"use strict";
import Sprite from './Renderer/sprite.js';

import { MoveAnimation, ResizeAnimation } from './Renderer/animation.js';




var CardState = {
    Normal: 0,
    Upgraded: 1,
    New: 2
}

class Card {
    constructor(value, pivotX, pivotY, i, j, maxI, maxJ) {
        if (value <= 0) {
            console.error("Invalid card value!");
            return;
        }
        this._value = value;
        this.pivotX = pivotX;
        this.pivotY = pivotY;
        this.maxI = maxI;
        this.maxJ = maxJ;
        this._state = CardState.New;
        this.createSprite();
        this.setToGrid(i,j);
        this.cardSprite.resize(0,0);
        this.animation = new ResizeAnimation(this.cardSprite, 100,100,10);
    }

    getCardImageName(value) {
        return value+".png";
    }

    createSprite() {
        this.cardSprite = new Sprite(this.getCardImageName(this._value));
        this.cardSprite.width = 100;
        this.cardSprite.height = 100;
    }

    setToGridCore(i,j) {
        if (i > this.maxI)
            return false;
        if (j > this.maxJ)
            return false;
        
        if (this.i === i && this.j === j)
            return false;
        
        this.i = i;
        this.j = j;

        return true;
    }

    setToGrid(i, j) {
        if (this.setToGridCore(i,j)) {
            this.setSpritePosition(this.pivotX + (i+1)*10 + i*100, this.pivotY + (j+1)*10 + j*100);
        }
    }

    moveToGrid(i,j, onFinished) {
        if (this.setToGridCore(i,j)) {
            this.animation = new MoveAnimation(this.cardSprite, this.pivotX + (i+1)*10 + i*100, this.pivotY + (j+1)*10 + j*100, 30, onFinished);
        }
    }

    setSpritePosition(x, y) {
        this.cardSprite.posX = x;
        this.cardSprite.posY = y;
    }

    updateSpriteImage() {
        this.cardSprite.setImage(this.getCardImageName(this._value));
    }


    get sprite() {
        return this.cardSprite;
    }

    set sprite(sprite) {
        console.log("Invalid acces to sprite");
    }

    get row() {
        return this.i;
    }

    get column() {
        return this.j
    }

    get value() {
        return this._value;
    }

    set value(value) {
        console.log("Invalid acces to card value");
    }

    stepFinished() {
        this._state = CardState.Normal; 
    }

    canMerge(otherCard) {
        return this._state !== CardState.Upgraded && otherCard.state !== CardState.Upgraded && this._value === otherCard.value;
    }

    upgrade() {
        if (this.value < 2048) {
            this._value *= 2;
            this.updateSpriteImage();
            this._state = CardState.Upgraded;
            this.animation = new ResizeAnimation(this.cardSprite, 130,130,10, () => {
                this.animation = new ResizeAnimation(this.cardSprite, 100, 100, 10)
            });
        }
    }

    update() {
        if (this.animation && !this.animation.finished) {
            this.animation.update();
        }
    }

    animating() {
        return (this.animation && !this.animation.finished);
    }
}

export default Card;
