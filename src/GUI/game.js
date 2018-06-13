"use strict";

import Phase from './phase.js';

class Game extends Phase {
    constructor() {
        super('game');
        this.viewContainer = document.createElement('div');
        this.viewContainer.classList.add('view-container');
        this.canvas = document.createElement('canvas');

        this.viewContainer.appendChild(this.canvas);
        this.element.appendChild(this.viewContainer);
    }


}

export default Game;