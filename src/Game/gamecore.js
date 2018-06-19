"use strict";

import EventEmitter from 'events';
import AssetManager from './Engine/assetmanager.js';
import KeyboardState from './Engine/keyboardstate.js';
import Renderer from './Renderer/renderer.js';
import Grid from './grid.js';
import Card from './card.js';
import Board from './board.js';
import Highscore from './highscores.js';

import assets from './assets.js';

class GameCore extends EventEmitter {
    constructor() {
        super();
        console.log("Game Core constructed");
    }

    init(canvas) {
        this.canvas = canvas;

        this.keyboard = new KeyboardState();
        this.keyboard.on('keyWasPressed', keyCode => this.keyWasPressed(keyCode));

        this.assetManager = new AssetManager(assets);
        this.assetManager.on('preloadFinished', () => { this.preloadFinished() });

        global['assetManager'] = this.assetManager;
    }

    get score() {
        return this._score;
    }

    set score(newScore) {
        this._score = newScore;
        this.emit('scoreChanged', this._score);
    }

    get bestScore() {
        return this.highscore.getBestScore();
    }

    set bestScore(newBestScore) {
        console.error('invalid best score set call');
        return;
    }

    start(canvas) {
        this.init(canvas);

        this.startPreload();
    }

    startPreload() {
        this.assetManager.preloadAssets((assetsToLoad, assetsLoaded) => {
            this.emit('preloadProcessing', {toLoad: assetsToLoad, loaded: assetsLoaded});
        })
        this.emit("preloadStarted");
    }

    preloadFinished() {
        this.renderer = new Renderer(this.canvas);
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
        this.highscore = new Highscore();
        this.highscore.loadHighscore();

        this.emit('bestScoreChanged', this.highscore.getBestScore());
        this.emit('highscoresChanged', this.highscore.getScores());

        this.emit("preloadFinished");
        
        window.requestAnimationFrame(this.update.bind(this), this.renderer.canvas);
        document.body.style.backgroundImage = "url('"+assetManager.getImage('bg.jpg').src+"')";
        document.body.style.backgroundRepeat = "repeat";
    }

    startNewGame() {
        if (this.board.isAnimating() || this.grid.isAnimating())
            return;

        this.score = 0;
        this.board.reset();
        this.grid.gameStart(() => {
            this.board.addNewCardRandom();
            this.board.addNewCardRandom();
        });
    }

    keyWasPressed(key) {
        if (!this.board.canStep() || this.board.isAnimating()) {
            return;
        }

        var actionCount = 0;
        if (key === "left") {
            actionCount = this.board.left();
        } else if (key === "right") {
            actionCount = this.board.right();
        } else if (key === "up") {
            actionCount = this.board.up();
        } else if (key === "down") {
            actionCount = this.board.down();
        }

        if (actionCount > 0 && this.board.canStep()) {
            this.board.requestNewCard();
        }
    }

    update() {
        this.grid.update();

        this.board.update();

        this.renderer.render();

        window.requestAnimationFrame(this.update.bind(this), this.renderer.canvas);
    }

    gameEnd(won) {
        setTimeout(() => {
            this.board.emptyBoard();
            if (won)
                this.grid.gameWon();
            else 
                this.grid.gameOver();            

            this.highscore.registerScore(this.score);
            this.emit('bestScoreChanged', this.highscore.getBestScore()); 
            this.emit('highscoresChanged', this.highscore.getScores());
        }, 1000);

    }
}

export default GameCore;