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
    constructor(src) {
        this.src = src;
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

class AssetManagerMock {
    constructor() {

    }

    getImage(imageName) {
        return new ImageMock(imageName);
    }
}

export  {
    SpriteMock,
    ImageMock,
    CanvasMock,
    AssetManagerMock,
};