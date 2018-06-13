"use strict";

import Phase from './phase.js';

class MainMenu extends Phase {
    constructor() {
        super('mainmenu');

        this.startGameButton = document.createElement('div');
        this.startGameButton.innerHTML = "Start Game";
        this.startGameButton.classList.add('btn');

        this.highscoresButton = document.createElement('div');
        this.highscoresButton.innerHTML = "View Highscores";
        this.highscoresButton.classList.add('btn');
        
        this.element.appendChild(this.startGameButton);
        this.element.appendChild(this.highscoresButton);

        this.startGameButton.addEventListener("click", () => this.emit("startNewGameClicked"));
        this.highscoresButton.addEventListener("click", () => this.emit("highscoresClicked"));
    }
}


export default MainMenu;