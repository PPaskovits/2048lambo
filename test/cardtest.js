"use strict";

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Card from '../src/Game/card.js';

import { SpriteMock, AssetManagerMock } from './mocks.js';

export default function runCardTests() {
    global.Sprite = SpriteMock;
    global.assetManager = new AssetManagerMock();

    describe('Card Test', function() {
        describe('Basic card test', function() {
            it('should equal ', function() {
                var card = new Card(1024,10,10,1,1,5,5);
                chai.expect(card.row).eql(1); 
                chai.expect(card.column).eql(1);

                card.setToGrid(1,2);

                chai.expect(card.row).eql(1); 
                chai.expect(card.column).eql(2);

                card.setToGrid(6,3);

                chai.expect(card.row).eql(1); 
                chai.expect(card.column).eql(2);

                card.setToGrid(3,6);

                chai.expect(card.row).eql(1); 
                chai.expect(card.column).eql(2);

                chai.expect(card.value).eql(1024);

                var invalidCard = new Card(-2,10,10,5,5);
                chai.expect(invalidCard).eql({});

            });
        });

        describe('Card upgrade and merge check test', function() {
            it('merge checks ', function() {
                var card1 = new Card(1024,10,10,5,5);
                var card2 = new Card(1024,10,10,5,5);
                var card3 = new Card(2048,10,10,5,5);

                chai.expect(card1.canMerge(card2)).eql(true);
                chai.expect(card1.canMerge(card3)).eql(false);

                var sprite = card1.sprite;
                card1.sprite = {};
                chai.expect(sprite).to.equal(card1.sprite);

                card1.upgrade();
                card3.upgrade();

                chai.expect(card1.value).eql(2048);
                chai.expect(card3.value).eql(2048);

                card2.value = 2;
                chai.expect(card2.value).eql(1024);
                
                chai.expect(card1.canMerge(card2)).eql(false);
                chai.expect(card1.canMerge(card3)).eql(false);

                card1.stepFinished();
                card3.stepFinished();

                chai.expect(card1.canMerge(card2)).eql(false);
                chai.expect(card1.canMerge(card3)).eql(true);
            });
        });
    });
};