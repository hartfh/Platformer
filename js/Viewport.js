var Viewport = function(config) {
	this.init(config);
}

Viewport.prototype.init = function(config) {
	var config	= config || {};
	var _height	= config.height || 0;			// Pixel height
	var _width	= config.width || 0;			// Pixel width
	var _pixelGrid	= config.pixelGrid;
	var _position	= config.position || {x: 0, y: 0};	// Position within the PixelGrid

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
		return _position;
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

			_position.x += adjust.x;
			_position.y += adjust.y;

			// Ensure the viewport remaims within its PixelGrid's boundaries
			if( _position.x < 0 ) {
				_position.x = 0;
			}
			if( _position.y < 0 ) {
				_position.y = 0;
			}
			if( _position.x >= pxDims.width ) {
				_position.x = pxDims.width - 1;
			}
			if( _position.x >= pxDims.height ) {
				_position.x = pxDims.height - 1;
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
