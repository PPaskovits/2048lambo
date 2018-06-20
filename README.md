# 2048lambo

Win a brand new Lamborghini for Xmas!
Game is based on 2048game.com.
Use keys to move the cards around the board. Reach the biggest card value 2048 before the board gets full!

Game Architecture:
----------------

Lambo4Xmas has a board, which has X rows and Y columns. The board can contain 0 - (X*Y) cards. 

If an user hits left,right,top,or down, the board tries to move the cards in the given direction.

Cards can merge if they are moved in the same direction and has the same value.

In case of merge, the merging card disappears, the merged card's value is doubled.

Game is over when the board is full, and the user cannot do any movement.

Game is won if board has a card with a value of 2048

* Assets - contains the images
* Game
	* _Engine_
		* _assetmanager.js_ - storage class for assets, responsible for asset downloading
		* _keyboardstate.js_ - handles key state changes, registers pressed keys
	* _Renderer_
		* _animation.js_ - implements Move, Resize and Fade animations on a sprite
		* _renderer.js_ - handles rendering order, renders the scene
		* _scene.js_ - stores the renderable objects of the scene
		* _sprite.js_ - implements the display of an image on a position in a given size
	* _assets.js_ - assets that are required in the distribution are defined here
	* _board.js_ - implements the board that contains the cards, manages the movement and merge of cards, detects game over or win
	* _card.js_ - handles a card and its position, its movement and upgrade animation
	* _gamecore.js_ - initialize the game objects, handles user interaction and board events, notifies the GUI
	* _grid.js_ - implements the background and the grid, can be changed to game over or game won screen with fading
	* _highscores.js_ - loads the highscores from cookies, manages the best 10 scores
	
* GUI
	* _game.js_ - game phase has the viewport canvas and all the gui objects with events on the game screen
	* _gui.js_ - listens to game events, handles gui phase changes based on these events, notifies each phases
	* _highscores.js_ - highscores phase shows the best 10 highscores, can be reached via mainscreen or game phase, too
	* _loading.js_ - shows the loading screen, notified while preloading
	* _mainmenu.js_ - this is the mainscreen phase
	* _phase.js_ - represents an abstract class of a gui phase

*_index.js_: Entry point
	
Installation:
----------------
```
npm install
```

Build:
----------------
```
npm run build
```

Build and Start:
----------------
```
npm start
```

Development Watch Start:
----------------
```
npm run startdev
```

Development Watch Start:
----------------
```
npm run startdev
```

Testing:
----------------
```
npm test
```

Testing with coverage report:
----------------
```
npm run test-coverage
```
