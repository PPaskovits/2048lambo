"use strict";

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Highscore from '../src/Game/highscores.js';


export default function runHighscoresTests() {
    global.document = {cookie: "highscores=[1000,1500,2500]; path=/"}

    describe('Highscores Test', function() {
        describe('Score test', function() {
            it('should equal ', function() {
                var highscores = new Highscore();
                highscores.loadHighscore();
                chai.expect(highscores.getBestScore()).eql(2500);
                chai.expect(highscores.getScores()).eql([2500,1500,1000]);
                highscores.registerScore(1200);
                highscores.registerScore(3500);
                highscores.registerScore(4500);
                highscores.registerScore(5500);
                highscores.registerScore(6500);
                highscores.registerScore(7500);
                highscores.registerScore(8500);
                highscores.registerScore(9500);
                highscores.registerScore(10500);
                chai.expect(highscores.getBestScore()).eql(10500);
                chai.expect(highscores.getScores()).eql([10500,9500,8500,7500,6500,5500,4500,3500,2500,1500]);
                chai.expect(document.cookie).eql("highscores=[10500,9500,8500,7500,6500,5500,4500,3500,2500,1500]; path=/");
            });
        });
    });
};