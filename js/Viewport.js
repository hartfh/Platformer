var Viewport = function(config) {
	var config = config || {};

	this.init(config);
}

Viewport.prototype.init = function(config) {
	var _self		= this;
	var _handle	= config.handle || '';
	var _height	= config.height || 0;				// Pixel height
	var _width	= config.width || 0;				// Pixel width
	var _grid		= config.grid;						// A PixelGrid object
	var _gridPos	= config.gridPos || {x: 0, y: 0};		// Position within the PixelGrid
	var _screenPos	= config.screenPos || {x: 0, y: 0};	// Position of the Viewport element on the screen or within its parent container

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

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	_self.shift = function(direction) {
		if( DIRECTIONS.hasOwnProperty(direction) ) {
			var adjust	= DIRECTIONS[direction];
			var pxDims	= _grid.getDimensions();

			_gridPos.x += adjust.x;
			_gridPos.y += adjust.y;

			// Ensure the viewport remaims within its PixelGrid's boundaries
			if( _gridPos.x < 0 ) {
				_gridPos.x = 0;
			}
			if( _gridPos.y < 0 ) {
				_gridPos.y = 0;
			}
			if( _gridPos.x >= pxDims.width ) {
				_gridPos.x = pxDims.width - 1;
			}
			if( _gridPos.y >= pxDims.height ) {
				_gridPos.y = pxDims.height - 1;
			}
		}
	}

	_self.getVisibleAssets = function() {
		// get all assets within regions
	}

	_self.draw = function() {
		// draw to multiple layers
		// get all assets within viewport's dimensions
		// think up an efficient way to store the location of assets.
		//	-consider multiple area "buckets" that contain approximate locations of each asset.
		//	-can simply get assets in those buckets, rather than checking ALL assets
	}
}
