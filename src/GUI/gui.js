"use strict";

//import './phase.js';
import Loading from './loading.js';
import MainMenu from './mainmenu.js';
import HighScores from './highscores.js';
import Game from './game.js';
//import './mainmenu.js';
//import './highscores.js';

class GUI {
    constructor(game) {
        this.game = game;
        game.on('preloadStarted', this.preloadStarted.bind(this));
        game.on('preloadProcessing', this.preloadProcessing.bind(this));
        game.on('preloadFinished', this.preloadFinished.bind(this));
        game.on('scoreChanged', this.scoreChanged.bind(this));
        game.on('bestScoreChanged', this.bestScoreChanged.bind(this));
        game.on('highscoresChanged', this.highscoresChanged.bind(this));

        this.phases = [];
        this.loading = new Loading();
        this.phases.push(this.loading);

        var mainMenu = new MainMenu();
        mainMenu.on('startNewGameClicked', this.startNewGameClicked.bind(this));
        mainMenu.on('highscoresClicked', this.highscoresClicked.bind(this));

        this.phases.push(mainMenu);

        this.highscores = new HighScores();
        this.highscores.on('backClicked', this.backClicked.bind(this));
        this.phases.push(this.highscores);

        this.gamePhase = new Game();
        this.gamePhase.on('newGameClicked', this.startNewGameClicked.bind(this));

        this.phases.push(this.gamePhase);

        this.lastPhases = [];
    }

    hideAllPhases() {
        this.phases.forEach(p => p.hide());
    }

    setPhase(phaseName) {
        this.hideAllPhases();
        let phase = this.phases.find(p => p.name === phaseName)
        if (phase)
            phase.show();
        this.phases.push(phase);
    }

    getCanvas() {
        return this.gamePhase.canvas;
    }

    preloadStarted() {
        this.setPhase("loading");
    }

    preloadProcessing(data) {
        this.loading.setPercent(Math.floor((data.loaded/data.toLoad)*100));
    }

    preloadFinished() {
        console.log("preload finished")
        this.setPhase("mainmenu");
    }

    scoreChanged(score) {
        this.gamePhase.setScore(score);
    }

    bestScoreChanged(bestScore) {
        this.gamePhase.setBestScore(bestScore);
    }

    highscoresChanged(highscores) {
        this.highscores.buildHighscores(highscores);
    }

    startNewGameClicked() {
        this.setPhase("game");
        this.game.startNewGame();
    }

    highscoresClicked() {
        this.setPhase("highscores");
    }

    backClicked() {
        if (this.phases.length > 1) {
            this.phases.splice(-1,1);
            this.hideAllPhases();
            this.phases[this.phases.length -1].show();
        }
    }

}

export default GUI;