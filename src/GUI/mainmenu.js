"use strict";

import Phase from './phase.js';
import LamboImage from '../Assets/lambo.png';

class MainMenu extends Phase {
    constructor() {
        super('mainmenu');
        this.container = document.createElement('div');
        this.container.classList.add('menu-container');
        this.container.classList.add('column');

        this.title = document.createElement('div');
        this.title.classList.add('title');
        this.lamboImg = document.createElement('img');
        this.lamboImg.src = LamboImage;
        this.title.appendChild(this.lamboImg);

        this.startGameButton = document.createElement('div');
        this.startGameButton.innerHTML = "Start Game";
        this.startGameButton.classList.add('btn');

        this.highscoresButton = document.createElement('div');
        this.highscoresButton.innerHTML = "View Highscores";
        this.highscoresButton.classList.add('btn');
        
        this.container.appendChild(this.title);
        this.container.appendChild(this.startGameButton);
        this.container.appendChild(this.highscoresButton);

        this.element.appendChild(this.container);

        this.startGameButton.addEventListener("click", () => this.emit("startNewGameClicked"));
        this.highscoresButton.addEventListener("click", () => this.emit("highscoresClicked"));
    }
}


export default MainMenu;