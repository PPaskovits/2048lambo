"use strict";

class Scene {
    constructor() {
        this._objects = [];
    }

    get objects() {
        return this._objects;
    }

    set objects(objects) {
        console.error("Invalid set call for objects.");
        return;
    }

    addObject(object) {
        this._objects.push(object);
    }

    removeObject(object) {
        this._objects = this.objects.filter(o => o != object);
    }
}

export default Scene;