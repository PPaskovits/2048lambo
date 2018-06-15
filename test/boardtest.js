const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Card from '../src/Game/card.js';
import Board from '../src/Game/board.js';

export default function runBoardTests() {
    sinon.stub(Card.prototype, 'createSprite').callsFake(() => 1);
    sinon.stub(Card.prototype, 'setSpritePosition').callsFake(() => 1);
    sinon.stub(Card.prototype, 'updateSpriteImage').callsFake(() => 1);
    sinon.stub(Board.prototype, 'postStep').callsFake(() => 1);
    var board = new Board(0, 0, 3, 3);

    describe('Board Test', function() {
        describe('Simple set/get board ', function() {
            it('should be equal ', function() {
                var cardsArray = 
                    [0,    2,   4,   8,
                     16,   32,  64,  128,
                     0,    0,   0,   0,
                     1024, 256, 512, 2];
                board.setBoard(cardsArray);3
                chai.expect(cardsArray).to.eql(board.getBoard());
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