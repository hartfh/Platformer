var PixelGrid = function(config) {
	var config = config || {};

	this.init(config);
};

PixelGrid.prototype.init = function(config) {
	const _REGION_SIZE = 100;			// Pixel height and width of each region

	var _self		= this;
	var _handle	= config.handle || '';
	var _height	= config.height || 0;	// Pixel width
	var _width	= config.width || 0;	// Pixel height
	var _regions	= [];				// 2-Dimensional array of objects referencing assets

	_self.destroy = function() {

	}

	_self.createRegions = function() {
		for(var x = 0; x < _width; x += _REGION_SIZE) {
			var column = [];

			for(var y = 0; y < _height; y += _REGION_SIZE) {
				column.push({});
			}

			_regions.push(column);
		}
	}

	/**
	 * Convert x- and y-coordinates into a region object.
	 *
	 * @param		{integer}	x	X-coordinate in pixels
	 * @param		{integer}	y	Y-coordinate in pixels
	 * @return	{object}		Region bucket object
	 */
	_self.getRegion = function(x, y) {
		var bucket = {
			x:	Math.floor(x / _REGION_SIZE),
			y:	Math.floor(y / _REGION_SIZE)
		};

		return _regions[bucket.x][bucket.y];
	}

	/**
	 * Remove an asset from _regions.
	 *
	 * @param		{object}	asset	Asset object
	 */
	_self.removeAssetFromRegions = function(asset) {
		for(var i in _regions) {
			var regionGroup = _regions[i];

			for(var j in regionGroup) {
				var region = regionGroup[j];

				if( _self.regionHasAsset(asset, region) ) {
					_self.removeAssetFromRegion(asset, region);
				}
			}
		}
	}

	/**
	 * Remove an asset from one region.
	 *
	 * @param		{object}	asset	Asset object
	 * @param		{object}	region	Region object
	 * @return	{boolean}			Return true/false on success or failure
	 */
	_self.removeAssetFromRegion = function(asset, region) {
		var assetCoords	= asset.getPosition();
		var assetHandle	= asset.getHandle();

		if( region.hasOwnProperty(assetHandle) ) {
			delete region[assetHandle];

			return true;
		}

		return false;
	}

	/**
	 * Add an asset to _regions.
	 *
	 * @param		{object}	asset	Asset object
	 * @return	{boolean}			Return true/false on success or failure
	 */
	_self.addAssetToRegions = function(asset) {
		var assetCoords	= asset.getPosition();
		var assetHandle	= asset.getHandle();
		var region		= _self.getRegion(assetCoords.x, assetCoords.y);

		if( !region.hasOwnProperty(assetHandle) ) {
			region[assetHandle] = asset;

			return true;
		}

		return false;
	}

	_self.regionHasAsset = function(asset, region) {
		var assetHandle = asset.getHandle();

		if( region.hasOwnProperty(assetHandle) ) {
			return true;
		}

		return false;
	}

	_self.checkRegion = function(asset) {
		if( _self.assetRegionNeedsUpdate(asset) ) {
			_self.removeAssetFromRegions(asset);
			_self.addAssetToRegions(asset);
		}
	}

	_self.assetRegionNeedsUpdate = function(asset) {
		var assetCoords	= asset.getPosition();
		var region		= _self.getRegion(assetCoords.x, assetCoords.y);

		return !_self.regionHasAsset(asset, region);
	}

	/**
	 * Get the height and width.
	 *
	 * @return	{object}
	 */
	_self.getDimensions = function() {
		return {
			height:	_height,
			width:	_width
		}
	}

	/**
	 * Get value of REGION_SIZE;
	 *
	 * @return	{integer}
	 */
	_self.getRegionSize = function() {
		return _REGION_SIZE;
	}

	_self.createRegions();
}
