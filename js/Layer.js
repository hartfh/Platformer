var Layer = function(config) {
	var config = config || {};

	this.init(config);
};

Layer.prototype.init = function(config) {
	var _self		= this;
	var _handle	= config.handle || '';
	var _height	= config.height || 0;		// Screen pixel height
	var _width	= config.width || 0;		// Screen pixel width

	jQuery('#' + APP_CONTAINER_ID).append('<canvas id="' + _handle + '" width="' + _width + '" height="' + _height + '" />');

	var _elem		= document.getElementById(_handle);
	var _ctx		= _elem.getContext('2d');
	// var order/z-index

	// Disable image smoothing during scaling
	_ctx.mozImageSmoothingEnabled		= false;
	_ctx.msImageSmoothingEnabled		= false;
	_ctx.imageSmoothingEnabled		= false;

	_self.getHandle = function() {
		return _handle;
	}

	_self.clearArea = function(start, end) {
		_ctx.clearRect(start.x - 1, start.y - 1, end.x - 1, end.y - 1);
	}

	/**
	 * Renders an asset's sprite.
	 *
	 * @param		{object}	asset		Asset object
	 * @param		{object}	offset		Coordinate offset in pixels
	 * @param		{object}	slice1		Coordinate object with how much of top and left of image should be sliced
	 * @param		{object}	slice2		Coordinate object with how much of bottom and right of image should be sliced
	 */
	_self.drawAsset = function(asset, offset, slice1, slice2) {
		if( typeof(offset) == 'undefined' ) {
			var offset = {x: 0, y: 0};
		}
		if( typeof(slice1) != 'object' ) {
			throw new Error('Slicing range 1 argument missing or not an object when drawing asset.');
		}
		if( typeof(slice2) != 'object' ) {
			throw new Error('Slicing range 2 argument missing or not an object when drawing asset.');
		}

		var spriteDiffX = SPRITE_SIZE - slice2.x;
		var spriteDiffY = SPRITE_SIZE - slice2.y;

		// Exit if the sprite would be fully outside the viewport
		if( spriteDiffX <= 0 && spriteDiffY <= 0 ) {
			return;
		}
		if( slice1.x >= 32 && slice1.y >= 32 ) {
			return;
		}

		var assetOrigin	= asset.getPosition();
		var renderOrigin	= {x: assetOrigin.x + offset.x - 2 , y: assetOrigin.y + offset.y - 2};
		var spriteSrc		= asset.getSprite();
		var img			= new Image();

		img.src = spriteSrc;

		_ctx.clearRect(renderOrigin.x, renderOrigin.y, spriteDiffX, spriteDiffY);
		_ctx.drawImage(img, slice1.x, slice1.y, spriteDiffX, spriteDiffY, renderOrigin.x, renderOrigin.y, spriteDiffX, spriteDiffY);
	}

	_self.destroy = function() {
		// Remove the canvas element from the DOM
		_elem.remove();
	}
}
