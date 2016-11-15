var Vector = function(magnitude, direction) {
	this.init(magnitude, direction);
};

Vector.prototype.init = function(magnitude, direction) {
	var _self		= this;
	var _direction	= direction || 0;
	var _magnitude	= magnitude || 0;
	var _radians	= degreesToRadians(_direction);

	_self.setDirection = function(degrees) {
		if( typeof(degrees) != 'number' ) {
			throw new Error('Velocity direction component must be a number.');
		}

		_direction	= degrees;
		_radians		= degreesToRadians(degrees);
	}

	_self.setMagnitude = function(magnitude) {
		if( typeof(magnitude) != 'number' ) {
			throw new Error('Velocity magnitude component must be a number.');
		}

		_magnitude = magnitude;
	}

	_self.getX = function() {
		return Math.cos(_radians) * _magnitude;
	}

	_self.getY = function() {
		return Math.sin(_radians) * _magnitude;
	}
};
