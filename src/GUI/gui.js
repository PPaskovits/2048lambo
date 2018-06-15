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
        game.on('preloadFinished', this.preloadFinished.bind(this));
        game.on('scoreChanged', this.scoreChanged.bind(this));
        game.on('bestScoreChanged', this.bestScoreChanged.bind(this));

        this.phases = [];
        this.phases.push(new Loading());

        var mainMenu = new MainMenu();
        mainMenu.on('startNewGameClicked', this.startNewGameClicked.bind(this));
        mainMenu.on('highscoresClicked', this.highscoresClicked.bind(this));

        this.phases.push(mainMenu);

        this.phases.push(new HighScores());

        this.gamePhase = new Game();
        this.gamePhase.on('newGameClicked', this.startNewGameClicked.bind(this));

        this.phases.push(this.gamePhase);
    }

    hideAllPhases() {
        this.phases.forEach(p => p.hide());
    }

    setPhase(phaseName) {
        this.hideAllPhases();
        let phase = this.phases.find(p => p.name === phaseName)
        if (phase)
            phase.show();
    }

    getCanvas() {
        return this.gamePhase.canvas;
    }

    preloadStarted() {
        console.log("preload started")
        this.setPhase("loading");
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

    startNewGameClicked() {
        console.log("new game clicked")
        this.setPhase("game");
        this.game.startNewGame();
    }

    highscoresClicked() {
        console.log("highscores clicked")
        this.setPhase("highscores");
    }

}

export default GUI;