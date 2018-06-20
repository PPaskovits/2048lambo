import './style.css';

import GameCore from './Game/gamecore.js';
import GUI from './GUI/gui.js';

window.onload = () => {
    var game = new GameCore();
    var gui = new GUI(game);
    
    game.start(gui.getCanvas());
}
