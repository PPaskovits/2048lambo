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
                chai.expect(highscores.getBestScore()).eql(3500);
                chai.expect(highscores.getScores()).eql([3500,2500,1500,1200,1000]);
                chai.expect(document.cookie).eql("highscores=[3500,2500,1500,1200,1000]; path=/");
            });
        });
    });
};