"use strict";

import EventEmitter from 'events';

class AssetManager extends EventEmitter{
    constructor(assets) {
        super();
        this.assets = assets;
        this.assetsLoaded = 0;
    }

    preloadAssets(onAssetLoaded) {
        this.assets.forEach(asset => {
            asset.image = new Image();
            asset.image.src = asset.path;
            asset.image.onload = () => {
                this.assetsLoaded++;
                if (onAssetLoaded)
                    onAssetLoaded(this.assets.length, this.assetsLoaded);

                if (this.assetsLoaded === this.assets.length)
                    this.emit('preloadFinished');
            }

        });
    }

    getImage(name) {
        var asset = this.assets.find(asset => asset.name === name);
        if (asset) {
            return asset.image;
        }
        return {};
    }
}

export default AssetManager;