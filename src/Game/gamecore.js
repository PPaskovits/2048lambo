"use strict";

import EventEmitter from 'events';
import KeyboardState from './Engine/keyboardstate.js';
import Renderer from './Renderer/renderer.js';
import Grid from './grid.js';
import Card from './card.js';
import Board from './board.js';

import BGImage from '../Assets/bg.jpg';

class GameCore extends EventEmitter {
    constructor() {
        super();
        console.log("Game Core constructed");
    }

    init(canvas) {
        this.keyboard = new KeyboardState();
        this.keyboard.on('keyWasPressed', keyCode => this.keyWasPressed(keyCode));
        this.renderer = new Renderer(canvas);
        this.grid = new Grid(this.renderer.getCanvasWidth() / 2, this.renderer.getCanvasHeight() / 2);
        this.renderer.addToScene(this.grid.bg);
        this.renderer.addToScene(this.grid.sprite);

        this.board = new Board(this.grid.pivotX, this.grid.pivotY, 3, 3);
        this.board.on('newCardAdded', (sprite) => { this.renderer.addToScene(sprite); } );
        this.board.on('cardRemoved', (sprite) => { this.renderer.removeFromScene(sprite); } );
        this.board.on('cardUpgraded', (card) => { this.score += card.value } );
        this.board.on('gameWon', (card) => { this.gameEnd(true); } );
        this.board.on('gameOver', (card) => { this.gameEnd(false); } );

        this._score = 0;
        this._bestScore = 0;
    }

    get score() {
        return this._score;
    }

    set score(newScore) {
        this._score = newScore;
        this.emit('scoreChanged', this._score);
    }

    get bestScore() {
        return this._bestScore;
    }

    set bestScore(newBestScore) {
        this._bestScore = newBestScore;
        this.emit('bestScoreChanged', this._bestScore);
    }



    start() {
        this.startPreload();
    }

    startPreload() {
        this.emit("preloadStarted");
        setTimeout(this.preloadFinished.bind(this), 1000);

    }

    preloadFinished() {
        this.emit("preloadFinished");
        window.requestAnimationFrame(this.update.bind(this), this.renderer.canvas);
        console.log(BGImage);
        document.body.style.backgroundImage = "url('"+BGImage+"')";
        document.body.style.backgroundRepeat = "repeat";
    }

    startNewGame() {
        this.score = 0;
        this.board.reset();
        this.grid.show();
        this.board.addNewCardRandom();
        this.board.addNewCardRandom();
    }

    keyWasPressed(key) {
        if (!this.board.canStep())
            return;

        if (key === "left") {
            this.board.left();
        } else if (key === "right") {
            this.board.right();
        } else if (key === "up") {
            this.board.up();
        } else if (key === "down") {
            this.board.down();
        }
    }

    update() {
        this.renderer.render();

        window.requestAnimationFrame(this.update.bind(this), this.renderer.canvas);
    }

    gameEnd(won) {
        this.grid.hide();
        this.board.emptyBoard();
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
        }

    }
}

export default GameCore;