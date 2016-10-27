var AssetGenerator = function(assetClass) {
	this.init(assetClass);
};

AssetGenerator.prototype.init = function(assetClass) {
	var _assetClass	= assetClass;
	var _assets		= {};
	var _assetCounter	= 0;
	//var _name			= config.name;

	this.addAsset = function(assetConfig) {
		var handle = assetConfig.name + '-' + _assetCounter;

		assetConfig.handle = handle;

		var asset = new _assetClass(assetConfig);

		_assets[handle] = asset;
		_assetCounter++;

		return asset;
	}

	this.getAssets = function() {
		return _assets;
	}

	this.eachAsset = function(callback) {
		for(var handle in _assets) {
			var asset = _assets[handle];

			callback(asset, handle);
		}
	}
}

AssetGenerator.prototype.reorderAsset = function() {
	// ?????
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
