"use strict";
import EventEmitter from 'events';

class KeyboardState	extends EventEmitter {
	constructor() {
        super();
		this.keyCodes	= {};
		this.lastPressed	= {};
		this.modifiers	= {};
		
		var self	= this;

		this._onKeyDown	= (event) => { 
            self._onKeyChange(event, true); 
            if (this.isPrevent(event)) 
                event.preventDefault()
        };
		this._onKeyUp	= (event) => { 
            self._onKeyChange(event, false);
            if (this.isPrevent(event))
                event.preventDefault()
        };

		document.addEventListener("keydown", this._onKeyDown, false);
		document.addEventListener("keyup", this._onKeyUp, false);

		this.MODIFIERS_	= ['shift', 'ctrl', 'alt', 'meta'];
		this.ALIAS_	= {
			'left'		: 37,
			'up'		: 38,
			'right'		: 39,
			'down'		: 40,
			'space'		: 32,
			'pageup'	: 33,
			'pagedown'	: 34,
			'tab'		: 9,
			'enter'		: 13
		};
	}

    isPrevent(event) {
        if ((event.keycode >= 37 && event.keyCode <= 40) || (event.keycode >= 48 && event.keyCode <= 57) || event.keyCode == 67) {
            return true;
        } else {
            return false;
        }
    }

    getKeyAlias(keyCode) {
        for (var alias in this.ALIAS_) {
            if (this.ALIAS_[alias] == keyCode) {
                return alias;
            }
        }
        return keyCode;
    }

    getKeyCode(keyAlias) {
        if(Object.keys(this.ALIAS_).indexOf(keyCode) != -1 ) {
            return this.ALIAS_[key];
        } else {
            return keyCode.toUpperCase().charCodeAt(0);
        }
    }

	destroy() {
		document.removeEventListener("keydown", this._onKeyDown, false);
		document.removeEventListener("keyup", this._onKeyUp, false);
	}

	_onKeyChange(event, pressed) {
        var keyCode		= event.keyCode;
		
        if (!pressed && this.lastPressed == keyCode) {
            this.emit('keyWasPressed', this.getKeyAlias(keyCode));
        }

        if (!this.keyCodes[keyCode] && pressed) {
            this.lastPressed = keyCode;
        }

		this.keyCodes[keyCode]	= pressed;

		this.modifiers['shift']= event.shiftKey;
		this.modifiers['ctrl']	= event.ctrlKey;
		this.modifiers['alt']	= event.altKey;
		this.modifiers['meta']	= event.metaKey;
	}

	pressed(keyDesc) {
		var keys	= keyDesc.split("+");
		for(var i = 0; i < keys.length; ++i){
			var key		= keys[i];
			var pressed;
			if( this.MODIFIERS_.indexOf(key) !== -1 ){
				pressed	= this.modifiers[key];
			} else {
				pressed	= this.keyCodes[this.getKeyCode(key)];
			}
			if(!pressed)
                return false;
		};
		return true;
	}
}

export default KeyboardState;