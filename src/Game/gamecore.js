"use strict";

import EventEmitter from 'events';
import KeyboardState from './keyboardstate.js';
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

        this.board.addNewCard(2,0,0);
        this.board.addNewCard(4,1,0);
        this.board.addNewCard(8,2,0);
        this.board.addNewCard(16,3,0);
        this.board.addNewCard(32,0,1);
        this.board.addNewCard(64,1,1);
        this.board.addNewCard(128,2,1);
        this.board.addNewCard(256,3,1);
        this.board.addNewCard(512,0,2);
        this.board.addNewCard(1024,1,2);
        this.board.addNewCard(2048,2,2);
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