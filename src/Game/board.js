"use strict";
import Card from './card.js';
import EventEmitter from 'events';

class Board extends EventEmitter{
    constructor(pivotX, pivotY, maxI, maxJ) {
        super();
        this.cards = [];
        this.pivotX = pivotX;
        this.pivotY = pivotY;
        this.maxI = maxI;
        this.maxJ = maxJ;
    }

    addNewCard(value, i,j) {
        var card = new Card(value, this.pivotX, this.pivotY, this.maxI, this.maxJ);
        card.setToGrid(i,j);
        this.cards.push(card);
        this.emit('newCardAdded', card.sprite);
        return card;
    }

    addNewCardRandom() {

    }
    left() {
        this.cards.forEach(card => {
            card.moveLeft();
        })
    }

    right() {
        this.cards.forEach(card => {
            card.moveRight();
        })
    }

    up() {
        this.cards.forEach(card => {
            card.moveUp();
        })
    }

    down() {
        this.cards.forEach(card => {
            card.moveDown();
        })
    }
}

export default Board;