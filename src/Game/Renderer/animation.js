"use strict";

class Animation {
    constructor(onFinished) {
        this._finished = false;
        this.onFinished = onFinished;
    }

    get finished() {
        return this._finished;
    }

    set finished(value) {
        if (!this._finished && value) {
            this._finished = value;
            if (this.onFinished)
                this.onFinished();
        }
    }

    update() {
        if (!this.finished) {
            this.step();
        }
    }

    step() {
        console.error("Animation is abstract!");
    }
}

class MoveAnimation extends Animation {
    constructor(object, targetX, targetY, velocity, onFinished) {
        super(onFinished);
        this.object = object;
        this.targetX = targetX;
        this.targetY = targetY;
        this.velocity = velocity;
        //var d = Math.sqrt(Math.pow(this.targetX - this.object.posX, 2) + Math.pow(this.targetY - this.object.posY, 2));
        this.angle = -Math.atan2(-(this.targetY - this.object.posY), this.targetX - this.object.posX);
        this._finished = this.targetX === this.object.posX && this.targetY === this.object.posY;
    }

    step() {
        var d = Math.sqrt(Math.pow(this.targetX - this.object.posX, 2) + Math.pow(this.targetY - this.object.posY, 2));
        if (d <= this.velocity) {
            this.object.posX = this.targetX;
            this.object.posY = this.targetY;
            this.finished = true;
            return;
        }

        var newPosX = this.object.posX + (Math.cos(this.angle)*this.velocity);
        var newPosY = this.object.posY + (Math.sin(this.angle)*this.velocity);
        this.object.posX = newPosX;
        this.object.posY = newPosY;
    }
}

class ResizeAnimation extends Animation {
    constructor(object, targetWidth, targetHeight, velocity, onFinished) {
        super(onFinished);
        this.object = object;
        this.targetWidth = targetWidth;
        this.targetHeight = targetHeight;
        this.velocity = velocity;
        this._finished = this.targetWidth === this.object.width && this.targetHeight === this.object.height;
    }

    step() {
        var dX = Math.abs(this.targetWidth - this.object.width);
        var newWidth = this.object.width;
        if (dX <= this.velocity) {
            newWidth = this.targetWidth;
        } else {
            newWidth = this.object.width - this.targetWidth < 0 ? this.object.width + this.velocity : this.object.width - this.velocity;
        }

        var dY = Math.abs(this.targetHeight - this.object.height);
        var newHeight = this.object.height;
        if (dY <= this.velocity) {
            newHeight = this.targetHeight;
        } else {
            newHeight = this.object.height - this.targetHeight < 0 ? this.object.height + this.velocity : this.object.height - this.velocity;
        }

        this.object.resize(newWidth, newHeight);

        this.finished = this.targetWidth === this.object.width && this.targetHeight === this.object.height;
    }
}

export  {
    MoveAnimation,
    ResizeAnimation
};
