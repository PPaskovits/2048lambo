"use strict";
import Card from './card.js';
import EventEmitter from 'events';

const Left = 0;
const Right = 1;
const Up = 2;
const Down = 3;

var BoardState = {
    Game: 1,
    Animating: 2,
    End: 3
}

class Board extends EventEmitter{
    constructor(pivotX, pivotY, maxI, maxJ) {
        super();
        this.cards = [];
        this.removedCards = [];
        this.pivotX = pivotX;
        this.pivotY = pivotY;
        this.maxI = maxI;
        this.maxJ = maxJ;
        this._state = BoardState.Game;
        this.newCardRequested = false;
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        if (this._state != newState) {
            this._state = newState;
        }
    }

    addNewCard(value, i,j) {
        var card;
        if (this.isValidIndices(i, j) && !this.getCard(i, j)) {
            card = new Card(value, this.pivotX, this.pivotY, i, j, this.maxI, this.maxJ);
            this.cards.push(card);
            this.emit('newCardAdded', card.sprite);
        }
        return card;
    }

    addNewCardRandom() {
        if (this.isFull())
            return;

        var value = Math.random > 0.7 ? 4 : 2;
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

    getMaxCardValue() {
        var value = 0;
        this.cards.forEach(card => {
            value = Math.max(value, card.value);
        });
        return value;
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
        card1.upgrade();
        
        this.cards = this.cards.filter(c => c != card2);
        this.removedCards.push(card2);
        card2.moveToGrid(card1.row, card1.column, () => { 
            this.removedCards = this.removedCards.filter(c => c!= card2);
            this.emit("cardRemoved", card2.sprite);
        });
        this.emit('cardUpgraded', card1);
    }

    moveCard(card, spot) {
        card.moveToGrid(spot.row, spot.column);
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
        if (!this.canStep())
            return;

        if (this.moveCards(movement, this.moveCard.bind(this), this.mergeCards.bind(this))) {
            this.cards.forEach(card => card.stepFinished());
        }
    }

    requestNewCard() {
        this.newCardRequested = true;
    }

    isAnimating() {
        var animating = false;
        this.cards.forEach(card => animating |= card.animating());
        this.removedCards.forEach(card => animating |= card.animating());
        return animating;
    }

    update() {
        this.cards.forEach(card => card.update());
        this.removedCards.forEach(card => card.update());

        if (this.getMaxCardValue() >= 2048) {
            this.state = BoardState.End;
            this.emit('gameWon');
            return;
        }

        if (this.newCardRequested && !this.isAnimating()) {
            this.newCardRequested = false;
            this.addNewCardRandom();
            if (this.isFull()) {
                let canMoveOrMerge = (this.moveCards(Left) || 
                                    this.moveCards(Right) ||
                                    this.moveCards(Up) ||
                                    this.moveCards(Down));
                if (!canMoveOrMerge) {
                    this.state = BoardState.End;
                    this.emit('gameOver');
                }
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

    reset() {
        this.emptyBoard();
        this.state = BoardState.Game;
    }

    emptyBoard() {
        this.cards.forEach(card => this.emit("cardRemoved", card.sprite));
        this.cards = [];
    }

    setBoard(cardsArray) {
        if (cardsArray.length != (this.maxI+1)*(this.maxJ+1)) {
            console.error("Invalid cards array length.");
            return [];
        }
        this.reset();
        var i = 0;
        var j = 0;

        cardsArray.forEach(value => {
            if (value > 0)
                this.addNewCard(value, i, j);
            j = i >= this.maxI ? (j + 1) % (this.maxJ + 1) : j;
            i = (i + 1) % (this.maxI + 1);
        })
    }

    getBoard() {
        var cardsArray = [];
        for (var j = 0; j <= this.maxJ; ++j) {
            for (var i = 0; i <= this.maxI; ++i) {
                var card = this.getCard(i, j);
                if (card) {
                    cardsArray.push(card.value);
                } else {
                    cardsArray.push(0);
                }
            }
        }
        return cardsArray;
    }

    canStep() {
        return this.state === BoardState.Game;
    }
}

export default Board;