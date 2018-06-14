"use strict";

import GridImage from '../Assets/grid.png';
import Sprite from './Renderer/sprite.js';

class Grid {
    constructor(centerX, centerY) {
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

    get pivotX() {
        return this.grid.posX;
    }

    get pivotY() {
        return this.grid.posY;
    }
}

export default Grid;
