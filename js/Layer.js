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
		var assetOrigin	= asset.getPosition();
		var assetSprites	= asset.getSprites();

		for(var i in assetSprites) {
			var sprite	= assetSprites[i];
			var img		= new Image();

			if( slice1.x > sprite.origin.x + sprite.width ) {
				console.log('stop1')
				continue;
			}
			if( slice1.y > sprite.origin.y + sprite.height ) {
				console.log('stop2')
				continue;
			}
			if( slice2.x > assetDims.width - sprite.origin.x ) {
				console.log('stop3')
				continue;
			}
			if( slice2.y > assetDims.height - sprite.origin.y ) {
				console.log('stop4')
				continue;
			}

			var renderOrigin = {
				x: assetOrigin.x + screenOffset.x - gridOffset.x + sprite.origin.x - 1,
				y: assetOrigin.y + screenOffset.y - gridOffset.y + sprite.origin.y - 1
			};

			// Correct for any negative render origin coordinates
			if( renderOrigin.x < 0 ) {
				renderOrigin.x = 0;
			}
			if( renderOrigin.y < 0 ) {
				renderOrigin.y = 0;
			}

			var offset1 = {x: slice1.x - sprite.origin.x, y: slice1.y - sprite.origin.y};

			if( offset1.x < 0 ) {
				offset1.x = 0;
			}
			if( offset1.y < 0 ) {
				offset1.y = 0;
			}

			var offset2 = {x: sprite.width, y: sprite.height};

			/*
			if( sprite.origin.x + sprite.width > assetDims.width - slice2.x ) {
				offset2.x -= slice2.x;
			}
			if( sprite.origin.y + sprite.height > assetDims.height - slice2.y ) {
				offset2.y -= slice2.y;
			}
			*/
			/*
			if( offset2.x < 0 ) {
				offset2.x = 0;
			}
			if( offset2.y < 0 ) {
				offset2.y = 0;
			}
			*/

			var realSlice2 = {
				x: slice2.x - (assetDims.width - sprite.origin.x - sprite.width),
				y: slice2.y - (assetDims.height - sprite.origin.y - sprite.height)
			};

			offset2.x -= realSlice2.x;
			offset2.y -= realSlice2.y;

			img.src = ASSETS_PATH + sprite.image;

			// TODO: clear area possibly incorrect
			_ctx.clearRect(renderOrigin.x, renderOrigin.y, sprite.width - slice2.x, sprite.height - slice2.y);
			_ctx.drawImage(img, offset1.x, offset1.y, offset2.x, offset2.y, renderOrigin.x, renderOrigin.y, offset2.x, offset2.y);
		}

		/*
		// OLD
		var assetDims		= asset.getDimensions();
		var assetOrigin	= asset.getPosition();

		var spriteDiffX = assetDims.width - slice2.x;
		var spriteDiffY = assetDims.height - slice2.y;

		// Exit if the sprite would be fully outside the viewport
		if( spriteDiffX <= 0 && spriteDiffY <= 0 ) {
			return;
		}
		if( slice1.x >= 32 && slice1.y >= 32 ) {
			return;
		}

		var renderOrigin = {x: assetOrigin.x + screenOffset.x - gridOffset.x - 1, y: assetOrigin.y + screenOffset.y - gridOffset.y - 1};

		// Correct for any negative render origin coordinates
		if( renderOrigin.x < 0 ) {
			renderOrigin.x = 0;
		}
		if( renderOrigin.y < 0 ) {
			renderOrigin.y = 0;
		}

		var spriteSrc		= asset.getSprite();
		var img			= new Image();

		img.src = spriteSrc;

		_ctx.clearRect(renderOrigin.x, renderOrigin.y, spriteDiffX, spriteDiffY);
		_ctx.drawImage(img, slice1.x, slice1.y, spriteDiffX, spriteDiffY, renderOrigin.x, renderOrigin.y, spriteDiffX, spriteDiffY);
		*/
	}

	_self.destroy = function() {
		// Remove the canvas element from the DOM
		_elem.remove();
	}
}
