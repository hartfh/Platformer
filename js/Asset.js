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
	var _height	= config.height || 1;				// Height of area to render the Asset's sprite
	var _width	= config.width || 1;				// Width of area to render the Asset's sprite
	var _hitboxes	= [];							// Array of objects, each with an origin, height and width. When combined they define an Asset's "hitbox". Points relative to asset's own grid position
	var _sprite	= config.sprite || 'error';

	// TODO: change _grid to be the grid handle, not reference to actual PixelGrid object
	// sprite (sprites should be defined elsewhere, and asset references that lookup table somehow. "type" and "sub-type"...?)
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
			height:	_height,
			width:	_width
		};

		return dimensions;
	}

	_self.getSprite = function() {
		var sprite = getSpriteImage(_sprite);

		return sprite;
	}

	_grid.addAssetToRegions(_self);
}
