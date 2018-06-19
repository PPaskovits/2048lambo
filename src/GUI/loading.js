"use strict";

import Phase from './phase.js';

class Loading extends Phase {
    constructor() {
        super('loading');
        this.loadingText = document.createElement('div');
        this.loadingText.classList.add('title');
        this.loadingText.innerHTML = 'Loading...0%';

        this.element.appendChild(this.loadingText);
    }

    setPercent(percent) {
        this.loadingText.innerHTML = 'Loading...'+percent+'%';
    }
}

export default Loading;