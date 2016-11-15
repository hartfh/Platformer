var Asset = function(config) {
	var config = config || {};

	this.init(config);
};

Asset.prototype.init = function(config) {
	var _self			= this;
	var _handle		= config.handle || '';
	var _gridPos		= config.position || {x: 0, y: 0};				// PixelGrid coordinates (can be floats)
	var _grid			= config.grid;								// Reference to the PixelGrid in which the Asset belongs
	var _layer		= config.layer;							// Handle of the Layer on which the Asset should be drawn
	var _sprite		= config.sprite || 'error';					// A code in the sprite lookup table
	var _velocity		= (config.velocity) ? new Vector(config.velocity.magnitude, config.velocity.direction) : new Vector(0, 0);
	var _acceleration	= (config.acceleration) ? new Vector(config.acceleration.magnitude, config.acceleration.direction) : new Vector(0, 0);

	// other properties? solidity, affected by gravity (mass)
	// descriptor properties (name, description)

	/**
	 * Cleans up any stray references to this Asset.
	 */
	_self.destroy = function() {
		_grid.removeAssetFromRegion(_self);
	}

	_self.getVelocity = function() {
		return {
			direction:	_velocity.direction,
			speed:		_velocity.speed
		};
	}

	_self.setSpeed = function(speed = 0) {
		_velocity.setMagnitude(speed);

		return _self;
	}

	_self.setDirection = function(angle = 0) {
		_velocity.setDirection(angle);

		return _self;
	}

	// Shift asset according to its velocity
	_self.move = function() {
		// Adjust grid position by velocity x- and y-components
		_gridPos.x += _velocity.getX();
		_gridPos.y += _velocity.getY();

		// Track grid position to three decimal places
		_gridPos.x = Math.round(_gridPos.x * 1000) / 1000;
		_gridPos.y = Math.round(_gridPos.y * 1000) / 1000;

		return _gridPos;
	}

	_self.accelerate = function() {
		var accelX = _acceleration.getX();
		var accelY = _acceleration.getY();

		var velX = _velocity.getX();
		var velY = _velocity.getY();

		var combinedX = accelX + velX;
		var combinedY = accelY + velY;

		var newAngle = radiansToDegrees( Math.atan(combinedY / combinedX) );
		var newMagnitude = Math.sqrt( Math.pow(combinedX, 2) + Math.pow(combinedY, 2) );

		_self.setDirection(newAngle);
		_self.setSpeed(newMagnitude);
	}

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	_self.shift = function(direction = 'o') {
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

		return _self;
	}

	_self.getPosition = function(round = false) {
		var gridPosition = {x: _gridPos.x, y: _gridPos.y};

		if( round ) {
			gridPosition = {
				x:	Math.round( _gridPos.x ),
				y:	Math.round( _gridPos.y ),
			};
		}

		return gridPosition;
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
	_self.getBounds = function(round = false) {
		var start		= _self.getPosition(round);
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
