import './style.css';

import GameCore from './Game/GameCore.js';
import GUI from './GUI/gui.js';

window.onload = () => {
    console.log("Page loadeded!");
    var game = new GameCore();
    var gui = new GUI(game);
    game.start();
}
