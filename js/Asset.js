var Asset = function(config) {
	this.init(config);
};

Asset.prototype.init = function(config) {
	var config = config || {};

	var _handle	= config.handle;
	var _name		= config.name || '';
	var _position	= config.position || {x: 0, y: 0};

	// other properties? solidity, affected by gravity (mass)

	this.getPosition = function() {
		return _position;
	}
	this.getHandle = function() {
		return _handle;
	}
}
