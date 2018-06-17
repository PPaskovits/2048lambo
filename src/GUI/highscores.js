"use strict";

import Phase from './phase.js';

class Highscores extends Phase {
    constructor() {
        super('highscores');
        this.container = document.createElement('div');
        this.container.classList.add('menu-container');
        this.container.classList.add('column');

        this.highscoreList = document.createElement('div');
        this.highscoreList.classList.add('column');

        this.container.appendChild(this.highscoreList);

        this.backBtn = document.createElement('div');
        this.backBtn.classList.add('btn');
        this.backBtn.classList.add('small');
        this.backBtn.innerHTML = "Back";
        this.backBtn.addEventListener("click", () => this.emit("backClicked"));
        this.container.appendChild(this.backBtn);

        this.element.appendChild(this.container);
    }

    buildHighscores(highscores) {
        this.highscoreList.innerHTML = "";
        highscores.forEach((highscore,index) => {
            var score = document.createElement('div');
            score.classList.add('score-title');
            score.innerHTML = (index+1)+". "+highscore;
            this.highscoreList.appendChild(score);
        });
    }
}

export default Highscores;