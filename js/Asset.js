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
	//var _elasticity	= config.elasticity || 1;					// Ranges from 0 - 1. Defines how much of velocity will be retains during a collision with another asset (1 => 100%)
	var _mass			= config.mass || 0;

	//var _solid = true/false;

	// other properties? solidity, affected by gravity (mass)
	// descriptor properties (name, description)

	/**
	 * Cleans up any stray references to this Asset.
	 */
	_self.destroy = function() {
		_grid.removeAssetFromRegion(_self);
	}

	_self.getMass = function() {
		return _mass;
	}

	_self.getVelocity = function() {
		return _velocity;
	}

	_self.setSpeed = function(magnitude = 0) {
		_velocity.setMagnitude(magnitude);

		return _self;
	}

	_self.setDirection = function(angle = 0) {
		_velocity.setDirection(angle);

		return _self;
	}

	// Shift asset according to its velocity
	_self.move = function() {
		// Determine disances to traverse
		var distX = _velocity.getX();
		var distY = _velocity.getY() * -1;

		if( _self.isObstructed(distX, distY) ) {
			return;
		}

		// Adjust grid position by velocity x- and y-components
		_gridPos.x += distX;
		_gridPos.y += distY;

		// Track grid position to three decimal places
		_gridPos.x = Math.round(_gridPos.x * 1000) / 1000;
		_gridPos.y = Math.round(_gridPos.y * 1000) / 1000;

		var pxDims = _grid.getDimensions();

		// Ensure the asset remains within its PixelGrid's boundaries
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

	// Implement an elastic collision between this and another asset
	// TODO: add "crumpling" property, so assets can diffuse some of the kinetic energy
	_self.collideWith = function(asset) {
		var m1	= _self.getMass();
		var m2	= asset.getMass();
		var v1	= _self.getVelocity();
		var v2	= asset.getVelocity();

		var xMagnitudes = getElasticVelocities(m1, m2, v1.getX(), v2.getX());
		var yMagnitudes = getElasticVelocities(m1, m2, v1.getY(), v2.getY());

		v1.setMagnitudes(xMagnitudes.v1, yMagnitudes.v1);
		v2.setMagnitudes(xMagnitudes.v2, yMagnitudes.v2);
	}

	_self.isObstructed = function(distX, distY) {
		// TODO: check this or other assets for solidity
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
					var ownHitboxes	= _self.getHitboxes(distX, distY);
					var hitboxes		= asset.getHitboxes();

					// Compare this asset's hitboxes and those of the nearby assets
					for(var a in ownHitboxes) {
						var ownHitbox = ownHitboxes[a];

						for(var b in hitboxes) {
							var hitbox = hitboxes[b];

							// If a collision is detected, figure out if it's movement in the x- or y-direction, or both, that's causing it and
							// cause "ricochet" behavior in the moving asset based on directionality of collision.
							if( boxesOverlap(hitbox, ownHitbox) ) {
								// Get hitboxes modified in only a single direction
								var ownHitboxesX = _self.getHitboxes(distX, 0);
								var ownHitboxesY = _self.getHitboxes(0, distY);

								var ownHitboxX = ownHitboxesX[a];
								var ownHitboxY = ownHitboxesY[a];

								// Do hitbox overlap comparisons
								var xCollision = boxesOverlap(hitbox, ownHitboxX);
								var yCollision = boxesOverlap(hitbox, ownHitboxY);

								_self.collideWith(asset);

								//_velocity.ricochet(xCollision, yCollision, _elasticity);
								// also apply ricochet to other asset

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
			var adjust	= DIRECTIONS[direction];
			var pxDims	= _grid.getDimensions();

			if( _self.isObstructed(adjust.x, adjust.y) ) {
				return;
			}

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

	/**
	 *
	 *
	 * @param		{float}	distX		Amount asset will be traveling in x-direction
	 * @param		{float}	distY		Amount asset will be traveling in y-direction
	 * @return	{array}				Array of objects containing start and end point objects
	 */
	_self.getHitboxes = function(distX, distY) {
		// Get asset's hitboxes and setup array for modified hitboxes
		var hitboxes		= SPRITE_KEY[_sprite].hitboxes;
		var offsetHitboxes	= [];

		// Determine the direction of travel and increase the hitboxes' dimensions in that direction
		var startMod	= {x: 0, y: 0};
		var endMod	= {x: 0, y: 0};

		if( distX < 0 ) {
			startMod.x = distX;
		}
		if( distY < 0 ) {
			startMod.y = distY;
		}
		if( distX > 0 ) {
			endMod.x = distX;
		}
		if( distY > 0 ) {
			endMod.y = distY;
		}

		// Offset each hitbox based on asset's grid position, as well as apply modifications based on travel direction
		for(var i in hitboxes) {
			var hitbox = hitboxes[i];

			var offsetHitbox = {
				start:	{
					x:	hitbox.start.x + _gridPos.x + startMod.x,
					y:	hitbox.start.y + _gridPos.y + startMod.y
				},
				end:		{
					x:	hitbox.end.x + _gridPos.x - 1 + endMod.x,
					y:	hitbox.end.y + _gridPos.y - 1 + endMod.y
				}
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
		var end		= {
			x:	_gridPos.x + SPRITE_KEY[_sprite].width,
			y:	_gridPos.y + SPRITE_KEY[_sprite].height
		};

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
