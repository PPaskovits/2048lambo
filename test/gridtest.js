"use strict";

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Grid from '../src/Game/grid.js';


export default function runGridTests() {
    describe('Grid and Background Test', function() {
        describe('Grid test', function() {
            it('should equal ', function() {
                var grid = new Grid(500,600);
                grid.sprite = {};
                grid.spriteBG = {};

                chai.expect(grid.sprite.posX).eql(500-225);
                chai.expect(grid.sprite.posY).eql(600-225);

                chai.expect(grid.spriteBG.posX).eql(500-225);
                chai.expect(grid.spriteBG.posY).eql(600-225);

                chai.expect(grid.pivotX).eql(500-225);
                chai.expect(grid.pivotY).eql(600-225);

                var watcher = { finished: function () {} };

                var spy = sinon.spy(watcher, "finished");


                grid.gameStart(spy.finished);

                while (grid.isAnimating())
                    grid.update();

                spy.calledOnce;

                grid.gameWon();
            
                while (grid.isAnimating())
                    grid.update();

                chai.expect(grid.spriteBG.image.src).eql("gamewon.png");
                chai.expect(grid.spriteBG.alpha).eql(1);
                    
                grid.gameOver();
            
                while (grid.isAnimating())
                    grid.update();

                chai.expect(grid.spriteBG.image.src).eql("gameover.png");
                chai.expect(grid.spriteBG.alpha).eql(1);

                grid.hide()
                chai.expect(grid.sprite.visible).eql(false);
                grid.show()
                chai.expect(grid.sprite.visible).eql(true);
            });
        });
    });
};