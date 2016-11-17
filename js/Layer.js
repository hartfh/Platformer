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


	_self.debugFill = function(start, end) {
		_ctx.fillStyle = 'rgba(0, 40, 15, 1)';
		_ctx.fillRect(start.x - 1, start.y - 1, end.x, end.y);
	}

	/**
	 * Renders an asset's sprite.
	 *
	 * @param		{object}	asset		Asset object
	 * @param		{object}	offset		Coordinate offset in pixels
	 * @param		{object}	slice1		Coordinate object with how much of top and left of image should be sliced
	 * @param		{object}	slice2		Coordinate object with how much of bottom and right of image should be sliced
	 */
	_self.drawAsset = function(asset, screenOffset, gridOffset, slice1, slice2) {
		if( typeof(screenOffset) == 'undefined' ) {
			var screenOffset = {x: 0, y: 0};
		}
		if( typeof(slice1) != 'object' ) {
			throw new Error('Slicing range 1 argument missing or not an object when drawing asset.');
		}
		if( typeof(slice2) != 'object' ) {
			throw new Error('Slicing range 2 argument missing or not an object when drawing asset.');
		}

		var assetDims		= asset.getDimensions();
		var assetOrigin	= asset.getPosition(true);
		var assetSprites	= asset.getSprites();

		for(var i in assetSprites) {
			var sprite	= assetSprites[i];
			var img		= new Image();
			var curFrames	= asset.getFrames();

			img.src = ASSETS_PATH + sprite.images[ curFrames[i] ];

			// If sprite is entirely outside the viewport, don't bother trying to render it
			if( slice1.x > sprite.origin.x + sprite.width ) {
				continue;
			}
			if( slice1.y > sprite.origin.y + sprite.height ) {
				continue;
			}
			if( slice2.x > assetDims.width - sprite.origin.x ) {
				continue;
			}
			if( slice2.y > assetDims.height - sprite.origin.y ) {
				continue;
			}

			var renderOrigin = {
				x: assetOrigin.x + screenOffset.x - gridOffset.x + sprite.origin.x - 1,
				y: assetOrigin.y + screenOffset.y - gridOffset.y + sprite.origin.y - 1
			};

			var offset1 = {x: slice1.x - sprite.origin.x, y: slice1.y - sprite.origin.y};

			if( offset1.x < 0 ) {
				offset1.x = 0;
			}
			if( offset1.y < 0 ) {
				offset1.y = 0;
			}

			var offset2 = {x: sprite.width, y: sprite.height};

			var adjSlice2 = {
				x: slice2.x - (assetDims.width - sprite.origin.x - sprite.width),
				y: slice2.y - (assetDims.height - sprite.origin.y - sprite.height)
			};

			offset2.x -= adjSlice2.x;
			offset2.y -= adjSlice2.y;

			// Determine area to clear
			var clearX = sprite.width - slice1.x - slice2.x;
			var clearY = sprite.height - slice1.y - slice2.y;

			if( clearX < 0 ) {
				clearX = 0;
			}
			if( clearY < 0 ) {
				clearY = 0;
			}

			var finalRenderOrigin = {
				x: renderOrigin.x + offset1.x,
				y: renderOrigin.y + offset1.y
			};

			// Correct for any negative render origin coordinates
			if( finalRenderOrigin.x < 0 ) {
				finalRenderOrigin.x = 0;
			}
			if( finalRenderOrigin.y < 0 ) {
				finalRenderOrigin.y = 0;
			}

			_ctx.clearRect(finalRenderOrigin.x, finalRenderOrigin.y, clearX, clearY);
			_ctx.drawImage(img, offset1.x, offset1.y, offset2.x, offset2.y, finalRenderOrigin.x, finalRenderOrigin.y, offset2.x, offset2.y);
		}
	}

	_self.destroy = function() {
		// Remove the canvas element from the DOM
		_elem.remove();
	}
}
