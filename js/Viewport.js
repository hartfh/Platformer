var Viewport = function(config) {
	var config = config || {};

	this.init(config);
}

Viewport.prototype.init = function(config) {
	var _self		= this;
	var _handle	= config.handle || '';
	var _height	= config.height || 0;				// Pixel height
	var _width	= config.width || 0;				// Pixel width
	var _grid		= config.grid;						// A PixelGrid object
	var _gridPos	= config.gridPos || {x: 1, y: 1};		// Position within the PixelGrid
	var _screenPos	= config.screenPos || {x: 0, y: 0};	// Position of the Viewport element on the screen or within its parent container

	// var order/z-index

	_self.destroy = function() {

	}

	/**
	 * Get the height and width.
	 *
	 * @return	{object}
	 */
	_self.getDimensions = function() {
		return {
			height:	_height,
			width:	_width
		};
	}

	/**
	 * Return the grid position coordinates.
	 *
	 * @return	{object}
	 */
	_self.getGridPosition = function() {
		return _gridPos;
	}

	/**
	 * Return the screen position coordinates.
	 *
	 * @return	{object}
	 */
	_self.getScreenPosition = function() {
		return _screenPos;
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

			// Ensure the viewport remains within its PixelGrid's boundaries
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
	}

	_self.draw = function(layers) {
		// pass viewport boundaries to layers
		// each layer draws its assets
	}

	// get all assets within regions, and each asset within that region
	_self.getVisibleAssets = function() {
		var start		= _gridPos;
		var end		= {x: _gridPos.x + _width - 1, y: _gridPos.y + _height - 1};
		var regions	= _grid.getRegionsWithin(start, end);
		var assets	= [];

		for(var i in regions) {
			var region = regions[i];

			for(var a in region) {
				var asset = region[a];

				assets.push(asset);
			}
		}

		return assets;
	}

	_self.draw = function() {
		var assets = _self.getVisibleAssets();

		for(var i in assets) {
			var asset = assets[i];

			asset.getLayer().drawAsset(asset);
		}

		/*
		var layerGroups	= {};

		for(var i in layers) {
			layerGroups[i] = [];
		}

		for(var i in assets) {
			var asset = assets[i];

			layerGroups[ asset.getLayer() ].push(asset);
		}

		var area = '???????'; // viewport boundaries

		for(var i in layerGroups) {
			var layer			= layers[i];
			var layerAssets	= layerGroups[i];

			layer.drawAssets(layerAssets, area);
		}
		*/

		// layer.drawAssets(assets);

		// group assets by layer??

		// redraw each layer within viewport bounds according to layer order
	}
}
