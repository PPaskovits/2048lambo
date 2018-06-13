"use strict";

import EventEmitter from 'events';
import Renderer from './Renderer/renderer.js';
import Grid from './grid.js';

class GameCore extends EventEmitter {
    constructor() {
        super();
        console.log("Game Core constructed");
    }

    init(canvas) {
        this.renderer = new Renderer(canvas);
        this.grid = new Grid(this.renderer);
    }

    start() {
        this.startPreload();
    }

    startPreload() {
        this.emit("preloadStarted");
        setTimeout(this.preloadFinished.bind(this), 1000);

    }

    preloadFinished() {
        console.log('Finisheeeed');
        this.emit("preloadFinished");
        window.requestAnimationFrame(this.update.bind(this), this.renderer.canvas);
    }

    update() {
        this.renderer.render();
    }
}

export default GameCore;