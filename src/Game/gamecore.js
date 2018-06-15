"use strict";

import EventEmitter from 'events';
import KeyboardState from './Engine/keyboardstate.js';
import Renderer from './Renderer/renderer.js';
import Grid from './grid.js';
import Card from './card.js';
import Board from './board.js';

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
        this.renderer.addToScene(this.grid.sprite);
        this.board = new Board(this.grid.pivotX, this.grid.pivotY, 3, 3);
        this.board.on('newCardAdded', (sprite) => { this.renderer.addToScene(sprite); } );
        this.board.on('cardRemoved', (sprite) => { this.renderer.removeFromScene(sprite); } );

                var cardsArray = 
                    [0, 2,  0, 0,
                     2, 4,  0, 0,
                     4, 0,  2, 16,
                     2, 4,  0, 2];
                this.board.setBoard(cardsArray);
        //this.board.addNewCardRandom();
        //this.board.addNewCardRandom();
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
    }

    keyWasPressed(key) {
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
}

export default GameCore;