"use strict";

import Phase from './phase.js';

class Loading extends Phase {
    constructor() {
        super('loading');
        this.element.innerHTML = "Loading...";
    }
}

export default Loading;