"use strict";
import Card2Image from '../Assets/2.png';
import Card4Image from '../Assets/4.png';
import Card8Image from '../Assets/8.png';
import Card16Image from '../Assets/16.png';
import Card32Image from '../Assets/32.png';
import Card64Image from '../Assets/64.png';
import Card128Image from '../Assets/128.png';
import Card256Image from '../Assets/256.png';
import Card512Image from '../Assets/512.png';
import Card1024Image from '../Assets/1024.png';
import Card2048Image from '../Assets/2048.png';

import Sprite from './Renderer/sprite.js';

import { MoveAnimation, ResizeAnimation } from './Renderer/animation.js';


function getCardImage(value) {
    switch (value) {
        case 2: return Card2Image;
        case 4: return Card4Image;
        case 8: return Card8Image;
        case 16: return Card16Image;
        case 32: return Card32Image;
        case 64: return Card64Image;
        case 128: return Card128Image;
        case 256: return Card256Image;
        case 512: return Card512Image;
        case 1024: return Card1024Image;
        case 2048: return Card2048Image;
        default:
            console.error("Invalid card value");
    }
    return "";
}

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

    createSprite() {
        this.cardSprite = new Sprite(getCardImage(this._value));
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
        this.cardSprite.setImage(getCardImage(this._value));
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
