var Viewport = function(config) {
	var config = config || {};

	this.init(config);
}

Viewport.prototype.init = function(config) {
	var _self			= this;
	var _handle		= config.handle || '';
	var _engine		= config.engine || false;
	var _height		= config.height || 0;				// Screen pixel height
	var _width		= config.width || 0;				// Screen pixel width
	var _grid			= config.grid;						// A PixelGrid object
	var _gridPos		= config.gridPos || {x: 1, y: 1};		// Position within the PixelGrid
	var _screenPos		= config.screenPos || {x: 0, y: 0};	// Position of the Viewport element on the screen or within its parent container
	var _pinnedAsset	= false;

	// var order/z-index

	_self.destroy = function() {

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
		};
	}

	/**
	 *
	 *
	 * @return	{object}					Object container "start" and "end" coordinate objects
	 */
	_self.getBounds = function(screenOffset) {
		var start	= _gridPos;
		var end	= {x: _gridPos.x + _width, y: _gridPos.y + _height};

		var bounds = {
			start:	start,
			end:		end
		};

		return bounds;
	}

	/**
	 * Return the grid position coordinates.
	 *
	 * @return	{object}
	 */
	_self.getGridPosition = function() {
		return _gridPos;
	}

	/**
	 * Return the screen position coordinates.
	 *
	 * @return	{object}
	 */
	_self.getScreenPosition = function() {
		return _screenPos;
	}

	// Affix viewport's gridPosition to an asset
	_self.pinToAsset = function(assetHandle) {
		_pinnedAsset = assetHandle;
	}

	_self.unpin = function() {
		_pinnedAsset = false;
	}

	_self.alignWithAsset = function(edgeBufferX, edgeBufferY) {
		if( _pinnedAsset ) {
			var pinnedAsset	= _engine.getAsset(_pinnedAsset);
			var assetPosition	= pinnedAsset.getPosition();
			var assetDimensions	= pinnedAsset.getDimensions();
			var gridDimensions	= _grid.getDimensions();

			var vportHalfWidth	= _width * 0.5;
			var vportHalfHeight	= _height * 0.5;

			var vportCenterX	= vportHalfWidth + _gridPos.x;
			var vportCenterY	= vportHalfHeight + _gridPos.y;

			var assetCenterX	= assetPosition.x + assetDimensions.width * 0.5;
			var assetCenterY	= assetPosition.y + assetDimensions.height * 0.5;

			if( assetCenterX > vportCenterX + edgeBufferX ) {
				if( assetCenterX >= vportHalfWidth ) {
					if( assetCenterX < gridDimensions.width - vportHalfWidth ) {
						_gridPos.x = assetCenterX - vportHalfWidth - edgeBufferX;
					}
				}
			}
			if( assetCenterX < vportCenterX - edgeBufferX ) {
				if( assetCenterX >= vportHalfWidth ) {
					if( assetCenterX < gridDimensions.width - vportHalfWidth ) {
						_gridPos.x = assetCenterX - vportHalfWidth + edgeBufferX;
					}
				}
			}

			if( assetCenterY > vportCenterY + edgeBufferY ) {
				if( assetCenterY >= vportHalfHeight ) {
					if( assetCenterY < gridDimensions.height - vportHalfHeight ) {
						_gridPos.y = assetCenterY - vportHalfHeight - edgeBufferY;
					}
				}
			}
			if( assetCenterY < vportCenterY - edgeBufferY ) {
				if( assetCenterY >= vportHalfHeight ) {
					if( assetCenterY < gridDimensions.height - vportHalfHeight ) {
						_gridPos.y = assetCenterY - vportHalfHeight + edgeBufferY;
					}
				}
			}

			// Old
			/*
			if( assetCenterX >= vportHalfWidth ) {
				if( assetCenterX < gridDimensions.width - vportHalfWidth ) {
					_gridPos.x = assetCenterX - vportHalfWidth;
				}
			}
			*/
			/*
			if( assetCenterY >= vportHalfHeight ) {
				if( assetCenterY < gridDimensions.height - vportHalfHeight ) {
					_gridPos.y = assetCenterY - vportHalfHeight;
				}
			}
			*/

			_self.enforceGridLimits();
			console.log(_gridPos)
		}
	}

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	_self.shift = function(direction) {
		if( DIRECTIONS.hasOwnProperty(direction) ) {
			var adjust	= DIRECTIONS[direction];

			_gridPos.x += adjust.x;
			_gridPos.y += adjust.y;

			_self.enforceGridLimits();
		}
	}

	_self.enforceGridLimits = function() {
		var pxDims	= _grid.getDimensions();

		// Ensure the viewport remains within its PixelGrid's boundaries
		if( _gridPos.x < 1 ) {
			_gridPos.x = 1;
		}
		if( _gridPos.y < 1 ) {
			_gridPos.y = 1;
		}
		if( _gridPos.x + _width >= pxDims.width ) {
			_gridPos.x = pxDims.width - _width - 1;
		}
		if( _gridPos.y + _height >= pxDims.height ) {
			_gridPos.y = pxDims.height - _height - 1;
		}
	}

	/**
	 * Get all assets within regions in and around this viewport.
	 *
	 * @return	{array}		Array of Assets
	 */
	_self.getVisibleAssets = function() {
		var buffer	= 50;
		var start		= _gridPos;
		var end		= {x: _gridPos.x + _width - 1, y: _gridPos.y + _height - 1};
		var regions	= _grid.getRegionsWithin({x: start.x - buffer, y: start.y - buffer}, {x: end.x + buffer, y: end.y + buffer});
		var assets	= [];

		for(var i in regions) {
			var region = regions[i];

			for(var a in region) {
				var asset = region[a];

				assets.push(asset);
			}
		}

		return assets;
	}

	// clear each layer within viewport's screen area.
	_self.clear = function(layers) {
		var start = _screenPos;
		var end	= {x: _screenPos.x + _width, y: _screenPos.y + _height};

		for(var i in layers) {
			var layer = layers[i];

			layer.clearArea(start, end);
		}
	}

	_self.draw = function(layers) {
		_self.clear(layers);
		_self.alignWithAsset(60, 60);

		var assets		= _self.getVisibleAssets();
		var vportBounds	= _self.getBounds();

		//DEBUG
		for(var l in layers) {
			var layer = layers[l];

			layer.debugFill(_screenPos, {x: _width, y: _height});
		}
		//END DEBUG

		for(var i in assets) {
			var asset = assets[i];

			// Check asset and viewport boundaries to determine if we need to create slicing ranges for the sprite
			var assetBounds = asset.getBounds(true);

			// How much to shave off each sprite if it falls partially outside the viewport
			var slice1 = {x: 0, y: 0};
			var slice2 = {x: 0, y: 0};

			// Slice 1: asset falls west or north of the viewport
			if( assetBounds.start.x < vportBounds.start.x ) {
				slice1.x = vportBounds.start.x - assetBounds.start.x;
			}
			if( assetBounds.start.y < vportBounds.start.y ) {
				slice1.y = vportBounds.start.y - assetBounds.start.y;
			}

			// Slice 2: asset falls south or east of the viewport
			if( assetBounds.end.x > vportBounds.end.x ) {
				slice2.x = assetBounds.end.x - vportBounds.end.x;
			}
			if( assetBounds.end.y > vportBounds.end.y ) {
				slice2.y = assetBounds.end.y - vportBounds.end.y;
			}

			asset.getLayer().drawAsset(asset, _screenPos, _gridPos, slice1, slice2);
		}
	}
}
