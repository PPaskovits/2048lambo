const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Card from '../src/Game/card.js';
import Board from '../src/Game/board.js';
import { SpriteMock } from './mocks.js';

export default function runBoardTests() {
    var board = new Board(0, 0, 3, 3);

    describe('Board Test', function() {
        global.Sprite = SpriteMock;
        describe('Simple set/get board ', function() {
            it('should be equal ', function() {

                var cardsArray = 
                    [0,    2,   4,   8,
                     16,   32,  64,  128,
                     0,    0,   0,   0,
                     1024, 256, 512, 2];
                board.setBoard(cardsArray);3
                chai.expect(cardsArray).to.eql(board.getBoard());

                var faultyArray = [1,2,3];
                board.setBoard(faultyArray);
                chai.expect(cardsArray).to.eql(board.getBoard());

                board.reset();
                var emptyBoardArray = 
                    [0, 0, 0, 0,
                     0, 0, 0, 0,
                     0, 0, 0, 0,
                     0, 0, 0, 0];
                chai.expect(emptyBoardArray).to.eql(board.getBoard());
            });
        });

        describe('Game over board ', function() {
            it('should be emitted ', function() {

                var cardsArray = 
                    [0,    16,   4,   8,
                     16,   32,  64,  128,
                     2,    512,   32,  4,
                     1024, 256, 512, 2];

                board.setBoard(cardsArray);

                var watcher = { gameOver: function () {} };

                var spy = sinon.spy(watcher, "gameOver");

                board.on("gameOver", watcher.gameOver);

                while (board.isAnimating())
                    board.update();

                board.requestNewCard();
                board.update();
                
                chai.assert(spy.calledOnce);
            });
        });

        describe('Game won board ', function() {
            it('should be emitted ', function() {

                var cardsArray = 
                    [0,    16,   4,   8,
                     16,   32,  64,  128,
                     1024, 512, 32,  4,
                     1024, 256, 512, 2];

                board.setBoard(cardsArray);

                var watcher = { gameWon: function () {} };

                var spy = sinon.spy(watcher, "gameWon");

                board.on("gameWon", watcher.gameWon);

                board.down();
                
                board.update();
                
                chai.assert(spy.calledOnce);
            });
        });

        describe('Simple board movement test 1', function() {
            it('should be equal ', function() {
                var cardsArray = 
                    [0, 2,  0, 0,
                     2, 4,  0, 0,
                     4, 0,  2, 16,
                     2, 4,  0, 2];
                board.setBoard(cardsArray);
                board.left();
                var cardsArrayResult = 
                    [2, 0,  0,  0,
                     2, 4,  0,  0,
                     4, 2,  16, 0,
                     2, 4,  2,  0];
                chai.expect(cardsArrayResult).to.eql(board.getBoard());
            });
        });

        describe('Simple board movement test 2', function() {
            it('should be equal ', function() {
                var cardsArray = 
                    [0, 2,  0, 0,
                     2, 4,  0, 0,
                     4, 0,  2, 16,
                     2, 4,  0, 2];
                board.setBoard(cardsArray);
                board.right();
                var cardsArrayResult = 
                    [0, 0,  0,  2,
                     0, 0,  2,  4,
                     0, 4,  2,  16,
                     0, 2,  4,  2];
                chai.expect(cardsArrayResult).to.eql(board.getBoard());
            });
        });

        describe('Simple board merge test 1', function() {
            it('should be equal ', function() {
                var cardsArray = 
                    [2, 2,  8, 2,
                     2, 4,  4, 0,
                     4, 0,  2, 2,
                     2, 4,  2, 2];
                board.setBoard(cardsArray);
                board.up();
                var cardsArrayResult = 
                    [4, 2,  8,  4,
                     4, 8,  4,  2,
                     2, 0,  4,  0,
                     0, 0,  0,  0];
                chai.expect(cardsArrayResult).to.eql(board.getBoard());
            });
        });

        describe('Simple board merge test 2', function() {
            it('should be equal ', function() {
                var cardsArray = 
                    [256, 4,  8, 0,
                     256, 4,  8, 2,
                     0, 1024,  2, 2,
                     512, 2,  2, 2];
                board.setBoard(cardsArray);
                board.down();
                var cardsArrayResult = 
                    [0,   0,    0,  0,
                     0,   8,    0,  0,
                     512, 1024, 16, 2,
                     512, 2,    4,  4];
                chai.expect(cardsArrayResult).to.eql(board.getBoard());
            });
        });

    });
};