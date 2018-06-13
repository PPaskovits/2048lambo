"use strict";
import EventEmitter from 'events';

class Phase extends EventEmitter {
    constructor(name) {
        super();
        this._name = name;
        this.element = document.createElement('div');
        this.element.style.display = "none";
        document.body.appendChild(this.element);
    }

    show() {
        this.element.style.display = "flex";
    }

    hide() {
        this.element.style.display = "none";
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }
}

export default Phase;