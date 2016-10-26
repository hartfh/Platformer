var Viewport = function(config) {
	this.init(config);
}

Viewport.prototype.init = function(config) {
	var config	= config || {};
	var _height	= config.height || 0;			// Pixel height
	var _width	= config.width || 0;			// Pixel width
	var _pixelGrid	= config.pixelGrid;
	var _coords	= config.coords || {x: 0, y: 0};	// Position within the PixelGrid

	/**
	 * Get the height and width.
	 *
	 * @return	{object}
	 */
	this.getDimensions = function() {
		return {
			height:	_height,
			width:	_width
		};
	}

	/**
	 * Get the position coordinates.
	 *
	 * @return	{object}
	 */
	this.getPosition = function() {
		return _coords;
	}

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	this.shift = function(direction) {
		if( DIRECTIONS.hasOwnProperty(direction) ) {
			var adjust	= DIRECTIONS[direction];
			var pxDims	= _pixelGrid.getDimensions();

			_coords.x += adjust.x;
			_coords.y += adjust.y;

			// Ensure the viewport remaims within its PixelGrid's boundaries
			if( _coords.x < 0 ) {
				_coords.x = 0;
			}
			if( _coords.y < 0 ) {
				_coords.y = 0;
			}
			if( _coords.x >= pxDims.width ) {
				_coords.x = pxDims.width - 1;
			}
			if( _coords.x >= pxDims.height ) {
				_coords.x = pxDims.height - 1;
			}
		}
	}
	this.draw = function() {
		// draw to multiple layers
		// get all assets within viewport's dimensions
		// think up an efficient way to store the location of assets.
		//	-consider multiple area "buckets" that contain approximate locations of each asset.
		//	-can simply get check assets in those buckets, rather than checking ALL assets
	}
}
