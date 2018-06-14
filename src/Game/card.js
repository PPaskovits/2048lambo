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

class Card {
    constructor(value, pivotX, pivotY, maxI, maxJ) {
        this.value = value;
        this.cardSprite = new Sprite(getCardImage(this.value));
        this.cardSprite.width = 100;
        this.cardSprite.height = 100;
        this.pivotX = pivotX;
        this.pivotY = pivotY;
        this.maxI = maxI;
        this.maxJ = maxJ;
        this.setToGrid(0,0);
    }

    setToGrid(i, j) {
        if (i > this.maxI)
            return;
        if (j > this.maxJ)
            return;

        this.i = i;
        this.j = j;
        this.cardSprite.posX = this.pivotX + (i+1)*10 + i*100;
        this.cardSprite.posY = this.pivotY + (j+1)*10 + j*100; 
    }

    get sprite() {
        return this.cardSprite;
    }

    set sprite(sprite) {
        console.log("Invalid acces to sprite");
    }

    moveLeft() {
        if (this.i > 0) {
            this.setToGrid(--this.i, this.j);
        }
    }

    moveRight() {
        if (this.i < this.maxI) {
            this.setToGrid(++this.i, this.j);
        }
    }

    moveUp() {
        if (this.j > 0) {
            this.setToGrid(this.i, --this.j);
        }
    }

    moveDown() {
        if (this.j < this.maxJ) {
            this.setToGrid(this.i, ++this.j);
        }
    }
}

export default Card;
