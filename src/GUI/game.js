"use strict";

import Phase from './phase.js';

class Game extends Phase {
    constructor() {
        super('game');
        this.viewContainer = document.createElement('div');
        this.viewContainer.classList.add('view-container');
        this.viewContainer.classList.add('column');

        this.createScoresTable();

        this.createCanvas();

        this.createNewGameButton();

        this.element.appendChild(this.viewContainer);
    }

    createScoresTable() {
        this.scores = document.createElement('div');

        this.scoreContainer = document.createElement('div');
        this.scoreContainer.classList.add('score-container');
        this.scoreContainer.classList.add('column');

        this.scoreTitle = document.createElement('div');
        this.scoreTitle.classList.add('score-title');
        this.scoreTitle.innerHTML = "Score";

        this.scoreValue = document.createElement('div');
        this.scoreValue.classList.add('score');
        this.scoreValue.innerHTML = "0";

        this.scoreContainer.appendChild(this.scoreTitle);
        this.scoreContainer.appendChild(this.scoreValue);
        this.scores.appendChild(this.scoreContainer);

        this.bestScoreContainer = document.createElement('div');
        this.bestScoreContainer.classList.add('score-container');
        this.bestScoreContainer.classList.add('column');

        this.bestScoreTitle = document.createElement('div');
        this.bestScoreTitle.classList.add('score-title');
        this.bestScoreTitle.innerHTML = "Best";

        this.bestScoreValue = document.createElement('div');
        this.bestScoreValue.classList.add('score');
        this.bestScoreValue.innerHTML = "0";

        this.bestScoreContainer.appendChild(this.bestScoreTitle);
        this.bestScoreContainer.appendChild(this.bestScoreValue);
        this.scores.appendChild(this.bestScoreContainer);

        this.viewContainer.appendChild(this.scores);
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.classList.add('viewport');
        this.viewContainer.appendChild(this.canvas);
    }

    createNewGameButton() {
        this.newGameBtn = document.createElement('div');
        this.newGameBtn.classList.add('btn');
        this.newGameBtn.classList.add('small');
        this.newGameBtn.innerHTML = "New Game";
        this.newGameBtn.addEventListener("click", () => this.emit("newGameClicked"));
        this.viewContainer.appendChild(this.newGameBtn);
    }

    setScore(score) {
        this.scoreValue.innerHTML = score;
    }

    setBestScore(bestScore) {
        this.bestScoreValue.innerHTML = bestScore;
    }
}

export default Game;