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
	var _regions	= [];				// 2-Dimensional array of objects with references to assets

	_self.destroy = function() {

	}

	/**
	 * Sets up 2-dimensional array of objects.
	 */
	_self.createRegions = function() {
		var width		= Math.ceil(_width / _REGION_SIZE) * _REGION_SIZE;
		var height	= Math.ceil(_height / _REGION_SIZE) * _REGION_SIZE;

		for(var x = 0; x <= width; x += _REGION_SIZE) {
			var column = [];

			for(var y = 0; y <= height; y += _REGION_SIZE) {
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
			x:	Math.floor( (x - 1) / _REGION_SIZE ),
			y:	Math.floor( (y - 1) / _REGION_SIZE )
		};

		return _regions[bucket.x][bucket.y];
	}

	/**
	 * Get all regions that fall within a rectangular area created by two points.
	 *
	 * @param		{object}	start	Start coordinates
	 * @param		{object}	end		End coordinates
	 * @return	{array}			An array of region objects. Returns an empty array if no regions found.
	 */
	_self.getRegionsWithin = function(start, end) {
		if( arguments.length != 2 ) {
			throw new Error('Must provide exactly two point arguments.');
		}

		var regions	= [];
		var sequenced	= sequencePoints(start, end);
		var start		= sequenced.start;
		var end		= sequenced.end;

		if( start.x < 1 ) {
			start.x = 1;
		}
		if( start.y < 1 ) {
			start.y = 1;
		}

		// Round up to the nearest region size
		end.x = Math.ceil(end.x / _REGION_SIZE) * _REGION_SIZE;
		end.y = Math.ceil(end.y / _REGION_SIZE) * _REGION_SIZE;

		if( end.x > _width ) {
			end.x == _width;
		}
		if( end.y > _height ) {
			end.y == _height;
		}

		for(var x = start.x; x <= end.x; x += _REGION_SIZE) {
			for(var y = start.y; y <= end.y; y += _REGION_SIZE) {
				regions.push( _self.getRegion(x, y) );
			}
		}

		return regions;
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
	 * @param		{object}	region	A _regions object container
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
	 * Add an asset to _regions. Automatically detects which region the asset should be added to.
	 *
	 * @param		{object}	asset	Asset object
	 */
	_self.addAssetToRegions = function(asset) {
		var assetCoords	= asset.getPosition();
		var assetHandle	= asset.getHandle();
		var region		= _self.getRegion(assetCoords.x, assetCoords.y);

		if( !region.hasOwnProperty(assetHandle) ) {
			region[assetHandle] = asset;
		}
	}

	/**
	 * Check if a region references an asset.
	 *
	 * @param		{object}	asset	Asset object
	 * @param		{object}	region	A _regions object container
	 */
	_self.regionHasAsset = function(asset, region) {
		var assetHandle = asset.getHandle();

		if( region.hasOwnProperty(assetHandle) ) {
			return true;
		}

		return false;
	}

	/**
	 * Updates which part of _regions an Asset falls into if necessary.
	 *
	 * @param		{object}	asset	Asset object
	 */
	_self.checkRegion = function(asset) {
		if( _self.assetRegionNeedsUpdate(asset) ) {
			_self.removeAssetFromRegions(asset);
			_self.addAssetToRegions(asset);
		}
	}

	/**
	 * Check if an Asset is in an incorrect _regions container.
	 *
	 * @param		{object}	asset	Asset object
	 * @return	{boolean}
	 */
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
