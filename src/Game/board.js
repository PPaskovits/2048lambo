"use strict";
import Card from './card.js';
import EventEmitter from 'events';

const Left = 0;
const Right = 1;
const Up = 2;
const Down = 3;


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
        var card;
        if (this.isValidIndices(i, j) && !this.getCard(i, j)) {
            card = new Card(value, this.pivotX, this.pivotY, this.maxI, this.maxJ);
            card.setToGrid(i,j);
            this.cards.push(card);
            this.emit('newCardAdded', card.sprite);
        }
        return card;
    }

    addNewCardRandom() {
        if (this.isFull())
            return;

        var i = Math.floor(Math.random() * (this.maxI + 1));
        var j = Math.floor(Math.random() * (this.maxJ + 1)); 
        while (!this.addNewCard(2, i, j)) {
            i = Math.floor(Math.random() * (this.maxI + 1));
            j = Math.floor(Math.random() * (this.maxJ + 1)); 
        }
    }

    isFull() {
        return (this.cards.length >= 16);
    }

    removeCard(card) {
        this.cards = this.cards.filter(c => c != card);
        this.emit('cardRemoved', card.sprite);
    }

    isValidIndices(i, j) {
        return (i >= 0 && i <= this.maxI && j >= 0 && j <= this.maxJ);
    }

    getCard(row, column) {
        return this.cards.find(card => card.row == row && card.column == column);
    }

    getCardInDirection(row, column, direction) {
        var card;
        while (!card && this.isValidIndices(row, column)) {
            card = this.getCard(row, column);
            switch (direction) {
                case Left: --row; break;
                case Right:++row; break;
                case Up: --column; break;
                case Down: ++column; break;
                default: console.error("Undefined direction!");
            }
        }

        return card;
    }

    getNeighbourInDirection(row, column, direction) {
        var card;
        while (!card && this.isValidIndices(row, column)) {
            switch (direction) {
                case Left: --row; break;
                case Right:++row; break;
                case Up: --column; break;
                case Down: ++column; break;
                default: console.error("Undefined direction!");
            }
            card = this.getCard(row, column);
        }

        return card;
    }

    getFreeInDirection(row, column, direction) {
        var spot = {row: row, column: column};
        var freeRow = row;
        var freeColumn = column;
        while (this.isValidIndices(freeRow, freeColumn)) {
            if (!this.getCard(freeRow, freeColumn)) {
                spot.row = freeRow;
                spot.column = freeColumn;
            }
            switch (direction) {
                case Left: --freeRow; break;
                case Right:++freeRow; break;
                case Up: --freeColumn; break;
                case Down: ++freeColumn; break;
                default: console.error("Undefined direction!");
            }
        }
        return spot;
    }

    getCard(row, column) {
        return this.cards.find(card => card.row == row && card.column == column);
    }

    getOppositeDirection(direction) {
        var opposite = 0;
        switch (direction) {
            case Left: opposite = Right; break;
            case Right: opposite = Left; break;
            case Up: opposite = Down; break;
            case Down: opposite = Up; break;
            default: console.error("Undefined direction!");
        }
        return opposite;
    }


    mergeCards(card1, card2) {
        console.log("merge at: "+card1.row + " , " + card1.column);
        card1.upgrade();
        this.removeCard(card2);
    }

    moveCard(card, spot) {
        console.log(card.row + " , " + card.column);
        card.setToGrid(spot.row, spot.column);
    }

    moveCards(movement, onMove, onMerge) {
        var row = movement == Right ? this.maxI : 0;
        var column = movement == Down ? this.maxJ : 0;
        var direction = this.getOppositeDirection(movement);

        var finished = false;
        var actionCount = 0;

        while (!finished) {
            var card = this.getCardInDirection(row, column, direction);
            while (card) {
                var neighbourCard = this.getNeighbourInDirection(card.row, card.column, direction);
                if (neighbourCard && card.canMerge(neighbourCard)) {
                    ++actionCount;
                    if (onMerge) 
                        onMerge(card, neighbourCard);
                    else
                        card = neighbourCard;
                } else {
                    var spot = this.getFreeInDirection(card.row, card.column, movement);
                    if (spot.row !== card.row || spot.column !== card.column) {
                        ++actionCount;
                        if (onMove)
                            onMove(card, spot);
                    }
                    card = neighbourCard;
                }
            }

            switch (movement) {
                case Left:
                case Right: ++column; break
                case Up: 
                case Down: ++row; break;
                default: console.error("Undefined movement!");
            }

            finished = !this.isValidIndices(row, column);
        }

        return actionCount;
    }

    move(movement) {
        if (this.moveCards(movement, this.moveCard.bind(this), this.mergeCards.bind(this))) {
            this.cards.forEach(card => card.stepFinished());
            this.addNewCardRandom();
            if (this.isFull()) {
                let canMoveOrMerge = (this.moveCards(Left) || 
                                      this.moveCards(Right) ||
                                      this.moveCards(Up) ||
                                      this.moveCards(Down));
                if (!canMoveOrMerge)
                    console.log("Game over!");
            }
        }
    }

    left() {
        this.move(Left);
    }

    right() {
        this.move(Right);
    }

    up() {
        this.move(Up);
    }

    down() {
        this.move(Down);
    }
}

export default Board;