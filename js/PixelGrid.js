var PixelGrid = function(config) {
	this.init(config);
};

PixelGrid.prototype.init = function(config) {
	var config	= config || {};
	var _height	= config.height || 0;	// Pixel width
	var _width	= config.width || 0;	// Pixel height

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
}
