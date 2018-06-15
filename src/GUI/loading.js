"use strict";

import Phase from './phase.js';

class Loading extends Phase {
    constructor() {
        super('loading');
        this.loadingText = document.createElement('div');
        this.loadingText.classList.add('title');
        this.loadingText.innerHTML = 'Loading...';

        this.element.appendChild(this.loadingText);
    }
}

export default Loading;