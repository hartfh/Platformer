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
	var _vector	= config.vector || {direction: 'o', speed: 0};
	// Vector: contains a point, relative to the asset, that determines directionality. Also contains a speed magnitude.
	// Unclear how speed works with game "ticks." Maybe speed is ticks to move one tile. Slow things travel 1 tile / 5 ticks. Faster means 1 tile / tick.
	// Or speed could simply be 0.2, 0.5, 1.0, etc. and position data would have to track/round decimals.

	// other properties? solidity, affected by gravity (mass)
	// descriptor properties (name, description)

	/**
	 * Cleans up any stray references to this Asset.
	 */
	_self.destroy = function() {
		_grid.removeAssetFromRegion(_self);
	}

	_self.getVector = function() {
		return {
			direction:	_vector.direction,
			speed:		_vector.speed
		}
	}

	_self.setDirection = function(direction) {
		if( typeof(direction) != 'string' ) {
			throw new Error('Vector direction argument must be a string.');
		}
		if( DIRECTIONS.hasOwnProperty(direction) ) {
			_vector.direction = direction;
		}
	}

	_self.setSpeed = function(speed = 0) {
		if( typeof(speed) != 'number' ) {
			throw new Error('Vector speed argument must be a number');
		}

		_vector.speed = speed;
	}

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	_self.shift = function(direction) {
		if( typeof(direction) != 'string' ) {
			var direction = _self.getVector().direction;
		}
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

	_self.getHitbox = function() {
		// Return one or multiple hitboxes based on sprites.
		// These should perhaps be pre-set in sprite data, so they don't have to be calculated.
	}

	/**
	 * Get height and width of area asset takes up according to its sprites.
	 *
	 * @return	{object}
	 */
	_self.getDimensions = function() {
		var dimensions = {
			height:	SPRITE_KEY[_sprite].height,
			width:	SPRITE_KEY[_sprite].width
		};

		return dimensions;
	}

	/**
	 * Get bounding start and end point objects.
	 *
	 * @return	{object}
	 */
	_self.getBounds = function() {
		var start		= _gridPos;
		var end		= {x: _gridPos.x + SPRITE_KEY[_sprite].width, y: _gridPos.y + SPRITE_KEY[_sprite].height};

		var bounds	= {
			start:	start,
			end:		end
		};

		return bounds;
	}

	/**
	 * Get sprite data from SPRITE_KEY table.
	 *
	 * @return	{array}		Array of objects containing sprite data
	 */
	_self.getSprites = function() {
		var sprites = [];

		for(var i in SPRITE_KEY[_sprite].sprites) {
			var sprite	= SPRITE_KEY[_sprite].sprites[i];

			sprites.push(sprite);
		}

		return sprites;
	}

	_grid.addAssetToRegions(_self);
}
