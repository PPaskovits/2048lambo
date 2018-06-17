const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import Renderer from '../src/Game/Renderer/renderer.js';
import Scene from '../src/Game/Renderer/scene.js';
import Sprite from '../src/Game/Renderer/sprite.js';

class ImageMock {
    constructor() {
        this.src = "";
    }
}

class CanvasMock {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.context = {draw: () => {}, clearRect: (x,y,width,height) => {}};
    }

    getContext(str) {
        return this.context;
    }
}

export default function runRendererTests() {
    global.Image = ImageMock
    global.Canvas = CanvasMock

    describe('Renderer Test', function() {
        describe('Sprite test', function() {
            it('basic test ', function() {
                var sprite = new Sprite('test1.png');
                sprite.posX = 10;
                sprite.posY = 20;
                sprite.width = 100;
                sprite.height = 200;

                var context = { drawImage: function (image, posX, posY, width, height) {} };
                var spy = sinon.spy(context, "drawImage");
                
                sprite.draw(context);
                chai.assert(spy.withArgs(sprite.image, 10, 20, 100, 200).called);

                sprite.posX = 15;
                sprite.posY = 25;
                sprite.width = 150;
                sprite.height = 250;
                sprite.setImage('test2.png');

                chai.expect(sprite.posX).eql(15);
                chai.expect(sprite.posY).eql(25);
                chai.expect(sprite.width).eql(150);
                chai.expect(sprite.height).eql(250);
                
                chai.expect(sprite.image.src).eql('test2.png');

                sprite.hide();
                sprite.draw(context);
                chai.assert(spy.calledOnce);

                sprite.show();

                sprite.draw(context);
                chai.assert(spy.withArgs(sprite.image, 15, 25, 150, 250).called);
                chai.assert(spy.calledTwice);
                
//                chai.expect(spy).to.have.been.called.with(sprite.image, 10,20,100,200);              
            });
        });

        describe('Scene test', function() {
            it('objects test ', function() {
                var scene = new Scene();
                chai.expect(scene.objects.length).eql(0);
                var obj1 = { data: "object1"};
                var obj2 = { data: "object2"};

                scene.addObject(obj1);
                scene.addObject(obj2);
                scene.objects = [];
                chai.expect(scene.objects.length).eql(2);
                scene.removeObject(obj2);
                chai.expect(scene.objects.length).eql(1);
            });
        });

        describe('Renderer test', function() {
            it('draw test ', function() {
                var canvas = new CanvasMock();
                var renderer = new Renderer(canvas);

                chai.expect(renderer.getCanvasWidth()).eql(500);
                chai.expect(renderer.getCanvasHeight()).eql(500);

                var obj1 = { data: "object1", draw: () => {}};
                var obj2 = { data: "object2", draw: () => {}};

                renderer.addToScene(obj1);
                renderer.addToScene(obj2);
                chai.expect(renderer.scene.objects.length).eql(2);

                var spyContext = sinon.spy(canvas.context, "clearRect");
                var spy1 = sinon.spy(obj1, "draw");
                var spy2 = sinon.spy(obj2, "draw");

                renderer.render();
                chai.assert(spyContext.withArgs(0, 0, 500, 500).calledOnce);
                chai.assert(spy1.withArgs(canvas.context).calledOnce);
                chai.assert(spy2.withArgs(canvas.context).calledOnce);
                
                renderer.removeFromScene(obj2);

                chai.expect(renderer.scene.objects.length).eql(1);
            });
        });
    });
};