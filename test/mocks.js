class SpriteMock {
    constructor(src) {
        this.src = src;
        this.posX = 0;
        this.posY = 0;
        this.height = 0;
        this.width = 0;
        this.alpha = 1;
        console.log("SpriteMock: " + src);
    }

    resize(width, height) {
        var centerX = this.posX + this.width/2;
        var centerY = this.posY + this.height/2;
        this.posX = centerX - width/2;
        this.posY = centerY - height/2;
        this.width = width;
        this.height = height;
    }

    setImage(src) {
        console.log("Setttt: "+src);
        this.src = src;
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
        this.context = {draw: () => {}, clearRect: (x,y,width,height) => {}, save: () => {}, restore: () => {}, drawImage: (image, posX, posY, width, height) => {} };
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