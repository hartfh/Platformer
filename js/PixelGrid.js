var PixelGrid = function(config) {
	this.init(config);
};

PixelGrid.prototype.init = function(config) {
	const _REGION_SIZE = 100;			// Pixel height and width of each region

	var config	= config || {};
	var _height	= config.height || 0;	// Pixel width
	var _width	= config.width || 0;	// Pixel height
	var _regions	= [];				// 2-Dimensional array of objects referencing assets

	this.createRegions = function() {
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
	this.getRegion = function(x, y) {
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
	 * @return	{boolean}			Return true/false on success or failure
	 */
	this.removeAssetFromRegion = function(asset) {
		var assetCoords	= asset.getPosition();
		var assetHandle	= asset.getHandle();
		var region		= this.getRegion(assetCoords.x, assetCoords.y);

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
	this.addAssetToRegion = function(asset) {
		var assetCoords	= asset.getPosition();
		var assetHandle	= asset.getHandle();
		var region		= this.getRegion(assetCoords.x, assetCoords.y);

		if( !region.hasOwnProperty(assetHandle) ) {
			region[assetHandle] = asset;

			return true;
		}

		return false;
	}

	/**
	 * Get the height and width.
	 *
	 * @return	{object}
	 */
	this.getDimensions = function() {
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
	this.getRegionSize = function() {
		return _REGION_SIZE;
	}

	this.createRegions();
}
