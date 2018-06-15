"use strict";

import GridImage from '../Assets/grid.png';
import GridBGImage from '../Assets/gridbg.png';
import Sprite from './Renderer/sprite.js';

class Grid {
    constructor(centerX, centerY) {
        this.bg = new Sprite(GridBGImage);
        this.bg.width = 450;
        this.bg.height = 450;
        this.bg.posX = centerX - this.bg.width/2;
        this.bg.posY = centerY -  this.bg.height/2;

        this.grid = new Sprite(GridImage);
        this.grid.width = 450;
        this.grid.height = 450;
        this.grid.posX = centerX - this.grid.width/2;
        this.grid.posY = centerY -  this.grid.height/2;
    }
    
    setCenter(centerX, centerY) {
        this.grid.posX = centerX - this.grid.width/2;
        this.grid.posY = centerY - this.grid.height/2;
    }

    get sprite() {
        return this.grid;
    }

    set sprite(sprite) {
        console.log("Invalid acces to sprite");
    }

    get spriteBG() {
        return this.bg;
    }

    set spriteBG(sprite) {
        console.log("Invalid acces to sprite");
    }

    get pivotX() {
        return this.grid.posX;
    }

    get pivotY() {
        return this.grid.posY;
    }

    hide() {
        this.grid.hide();
    }

    show() {
        this.grid.show();
    }

}

export default Grid;
