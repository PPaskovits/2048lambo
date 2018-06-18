class SpriteMock {
    constructor(src) {
        this.src = src;
        this.posX = 0;
        this.posY = 0;
        this.height = 0;
        this.width = 0;
    }

    resize() {
        
    }
}

class ImageMock {
    constructor() {
        this.src = "";
    }
}

class CanvasMock {
    constructor() {
        this.width = 0;
        this.height = 0;
        this.context = {draw: () => {}, clearRect: (x,y,width,height) => {}};
    }

    getContext(str) {
        return this.context;
    }
}


function getCardImageMock(value) {
    return value;
}

export  {
    SpriteMock,
    ImageMock,
    CanvasMock,
    getCardImageMock,
};