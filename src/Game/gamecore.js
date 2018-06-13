"use strict";
import EventEmitter from 'events';

class GameCore extends EventEmitter {
    constructor() {
        super();
        console.log("Game Core constructed");
    }

    start() {
        this.startPreload();
    }

    startPreload() {
        this.emit("preloadStarted");
        setTimeout(() => this.emit("preloadFinished"), 2000);
    }
}

export default GameCore;