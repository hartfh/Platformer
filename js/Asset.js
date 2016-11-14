var Asset = function(config) {
	var config = config || {};

	this.init(config);
};

Asset.prototype.init = function(config) {
	var _self		= this;
	var _handle	= config.handle || '';
	var _gridPos	= config.position || {x: 0, y: 0};		// PixelGrid coordinates
	var _grid		= config.grid;						// Reference to the PixelGrid in which the Asset belongs
	var _layer	= config.layer;					// Handle of the Layer on which the Asset should be drawn
	var _sprite	= config.sprite || 'error';			// A code in the sprite lookup table
	//var _height	= SPRITE_KEY[_sprite].height;			// Height of area to render the Asset's sprite
	//var _width	= SPRITE_KEY[_sprite].width;			// Width of area to render the Asset's sprite

	// TODO:	Add a way for an asset to be made up of multiple sprites.
	//		Not sure how this will work with _height and _width.
	//		Sprite keys may have to correspond to arrays of images.

	//var _hitboxes	= [];							// Array of objects, each with an origin, height and width. When combined they define an Asset's "hitbox". Points relative to asset's own grid position

	// other properties? solidity, affected by gravity (mass)
	// descriptor properties (name, description)

	/**
	 * Cleans up any stray references to this Asset.
	 */
	_self.destroy = function() {
		_grid.removeAssetFromRegion(_self);
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

			// Ensure the asset remaims within its PixelGrid's boundaries
			if( _gridPos.x < 1 ) {
				_gridPos.x = 1;
			}
			if( _gridPos.y < 1 ) {
				_gridPos.y = 1;
			}
			if( _gridPos.x >= pxDims.width ) {
				_gridPos.x = pxDims.width - 1;
			}
			if( _gridPos.y >= pxDims.height ) {
				_gridPos.y = pxDims.height - 1;
			}
		}

		_grid.checkRegion(_self);
	}

	_self.getPosition = function() {
		return _gridPos;
	}

	_self.getHandle = function() {
		return _handle;
	}

	_self.getLayer = function() {
		return _layer;
	}

	_self.getDimensions = function() {
		var dimensions = {
			height:	SPRITE_KEY[_sprite].height,
			width:	SPRITE_KEY[_sprite].width
		};

		return dimensions;
	}

	_self.getBounds = function() {
		var start		= _gridPos;
		var end		= {x: _gridPos.x + SPRITE_KEY[_sprite].width, y: _gridPos.y + SPRITE_KEY[_sprite].height};

		var bounds	= {
			start:	start,
			end:		end
		};

		return bounds;
	}

	_self.getSprites = function() {
		var sprites = [];

		for(var i in SPRITE_KEY[_sprite].sprites) {
			var sprite	= SPRITE_KEY[_sprite].sprites[i];
			//var img		= getSpriteImage(sprite);

			sprites.push(sprite);
		}

		return sprites;
	}

	_grid.addAssetToRegions(_self);
}
