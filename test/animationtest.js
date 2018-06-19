"use strict";

const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import { SpriteMock } from './mocks.js';
import { MoveAnimation, ResizeAnimation } from '../src/Game/Renderer/animation.js';

export default function runAnimationTests() {
    describe('Animation Test', function() {
        describe('Move test', function() {
            it('should equal ', function() {
                var sprite = new SpriteMock("test.jpg");
                sprite.posX = 10;
                sprite.posY = 20;

                var watcher = { finished: function () {} };

                var spy = sinon.spy(watcher, "finished");

                var animation = new MoveAnimation(sprite, 100,200, 13, watcher.finished);

                while (!animation.finished)
                    animation.update();

                chai.assert(spy.calledOnce);
                
                chai.expect(sprite.posX).eql(100);
                chai.expect(sprite.posY).eql(200);
            });
        });
        
        describe('Resize test', function() {
            it('should equal ', function() {
                var sprite = new SpriteMock("test.jpg");
                sprite.posX = 10;
                sprite.posY = 20;


                sprite.width = 20;
                sprite.height = 40;

                var watcher = { finished: function () {} };

                var spy = sinon.spy(watcher, "finished");

                var animation = new ResizeAnimation(sprite, 100, 200, 13, watcher.finished);

                while (!animation.finished)
                    animation.update();

                chai.assert(spy.calledOnce);
                
                chai.expect(sprite.posX).eql(-30);
                chai.expect(sprite.posY).eql(-60);

                chai.expect(sprite.width).eql(5);
                chai.expect(sprite.height).eql(200);
            });
        });

    });
};