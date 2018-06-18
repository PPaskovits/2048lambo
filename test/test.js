const chai = require('chai');
const assert = require('chai').assert;
const sinon = require('sinon');

import runBoardTests from './boardtest.js';
import runCardTests from './cardtest.js';
import runRendererTests from './renderertest.js';
import runHighscoresTests from './highscorestest.js';


runBoardTests();
runCardTests();
runRendererTests();
runHighscoresTests();