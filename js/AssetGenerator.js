var AssetGenerator = function(config) {
	var config = config || {};

	this.assets		= {};
	this.assetCounter	= 0;
	this.name			= config.name;
};

AssetGenerator.prototype.createAsset = function(assetConfig) {
	assetConfig.handle = this.name + '-' + this.assetCounter;

	var asset = new Asset(assetConfig);

	this.addAsset(asset);
	this.assetCounter++;

	return asset;
}

AssetGenerator.prototype.addAsset = function(asset) {
	this.assets[asset.handle] = asset;
}

AssetGenerator.prototype.getAsset = function(handle) {
	if( this.assets.hasOwnProperty(handle) ) {
		return this.assets[handle];
	}

	return false;
}

AssetGenerator.prototype.removeAsset = function(handle) {
	if( this.assets.hasOwnProperty(handle) ) {
		delete this.assets[handle];

		return true;
	}

	return false;
}
