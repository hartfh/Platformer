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

	//var _solid = true/false;
	//var _mass;
	//var _elasticity = 0-1;		// How much the asset bounces (1 is 100% bounce. 0 is no bounce)

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
		if( _self.isObstructed() ) {
			// TODO: apply elasticity changes (reversing velocity/acceleration). Needs to ricochet properly
			return;
		}

		// Adjust grid position by velocity x- and y-components
		_gridPos.x += _velocity.getX();
		_gridPos.y += _velocity.getY();

		// Track grid position to three decimal places
		_gridPos.x = Math.round(_gridPos.x * 1000) / 1000;
		_gridPos.y = Math.round(_gridPos.y * 1000) / 1000;

		var pxDims = _grid.getDimensions();

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

		_grid.checkRegion(_self);

		return _gridPos;
	}

	_self.accelerate = function() {
		_velocity.combineWith(_acceleration);
	}

	_self.isObstructed = function() {
		// TODO: check assets for solidity
		// if this asset isn't solid, can just return false right away.
		// other non-solid assets can be skipped over

		// Get all assets in the region(s) this asset is in
		var assetBounds	= _self.getBounds(true);
		var assetRegions	= _grid.getRegionsWithin(assetBounds.start, assetBounds.end);

		// Loop through each asset in nearby regions
		for(var i in assetRegions) {
			var region = assetRegions[i];

			for(var handle in region) {
				var asset = region[handle];

				if( handle != _handle ) {
					var ownHitboxes	= _self.getHitboxes();
					var hitboxes		= asset.getHitboxes();

					// Compare this asset's hitboxes and those of the nearby assets
					for(var a in ownHitboxes) {
						var ownHitbox = ownHitboxes[a];

						for(var b in hitboxes) {
							var hitbox = hitboxes[b];

							if( boxesOverlap(hitbox, ownHitbox) ) {
								return true;
							}
						}
					}
				}
			}
		}

		return false;
	}

	/**
	 * Update the position coordinates by one pixel in a single direction.
	 *
	 * @param		{string}	direction
	 */
	_self.shift = function(direction = 'o') {
		if( DIRECTIONS.hasOwnProperty(direction) ) {

			if( _self.isObstructed() ) {
				return;
			}

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

	_self.getHitboxes = function() {
		var hitboxes		= SPRITE_KEY[_sprite].hitboxes;
		var offsetHitboxes	= [];

		for(var i in hitboxes) {
			var hitbox = hitboxes[i];
			var offsetHitbox = {
				start:	{x: hitbox.start.x + _gridPos.x, y: hitbox.start.y + _gridPos.y},
				end:		{x: hitbox.end.x + _gridPos.x, y: hitbox.end.y + _gridPos.y},
			}

			offsetHitboxes.push(offsetHitbox);
		}

		return offsetHitboxes;
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
