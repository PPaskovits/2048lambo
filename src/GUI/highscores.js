"use strict";

import Phase from './phase.js';

class Highscores extends Phase {
    constructor() {
        super('highscores');
        this.element.innerHTML = "Highscores";
    }
}

export default Highscores;