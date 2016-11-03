var Asset = function(config) {
	var config = config || {};

	this.init(config);
};

Asset.prototype.init = function(config) {
	var _name		= config.name || '';
	//var _position	= config.position || {x: 0, y: 0}; // grid coordinates
	//var _grid = {}; // reference to a pixelGrid?
	//var size = {}; // how much space the asset takes up in the pixelGrid (i.e. its "hitbox" and where its sprite will be drawn to)

	// other properties? solidity, affected by gravity (mass)
	// properties for rendering asset (sprite, size??)

	/*
	this.getPosition = function() {
		return _position;
	}
	*/
}
