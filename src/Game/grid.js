"use strict";

import GridImage from '../Assets/grid.png';

class Grid {
    constructor(renderer) {
        this.renderer = renderer;
        this.grid = this.renderer.createSprite(GridImage);
        this.renderer.addToScene(this.grid);
        this.grid.width = 450;
        this.grid.height = 450;
        this.setToCenter();
    }
    
    setToCenter() {
        this.grid.posX = this.renderer.getCanvasWidth()/2 - 225;
        this.grid.posY = this.renderer.getCanvasHeight()/2 - 225;
    }
}

export default Grid;
