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

	_self.getHandle = function() {
		return _handle;
	}

	_self.drawAsset = function(asset, offset, slice1, slice2) {
		if( typeof(offset) == 'undefined' ) {
			var offset = {x: 0, y: 0};
		}

		var assetOrigin	= asset.getPosition();
		var assetDims		= asset.getDimensions();
		var renderOrigin	= {x: assetOrigin.x + offset.x - 2 , y: assetOrigin.x + offset.y - 2};
		var spriteSrc		= asset.getSprite();
		var img			= new Image();

		img.src = spriteSrc;

		_ctx.clearRect(renderOrigin.x, renderOrigin.y, assetDims.width, assetDims.height);
		_ctx.drawImage(img, slice1.x, slice1.y, SPRITE_SIZE - slice2.x, SPRITE_SIZE - slice2.y, renderOrigin.x, renderOrigin.y, SPRITE_SIZE - slice2.x, SPRITE_SIZE - slice2.y);
	}

	_self.destroy = function() {
		// Remove the canvas element from the DOM
		_elem.remove();
	}
}
