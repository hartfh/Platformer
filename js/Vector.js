var Vector = function(magnitude, direction) {
	this.init(magnitude, direction);
};

Vector.prototype.init = function(magnitude, direction) {
	var _self		= this;
	var _direction	= direction || 0;
	var _magnitude	= magnitude || 0;
	var _radians	= degreesToRadians(_direction);

	_self.combineWith = function(vector) {
		var vector1X	= _self.getX();
		var vector1Y	= _self.getY();

		var vector2X	= vector.getX();
		var vector2Y	= vector.getY();

		var combinedX	= vector1X + vector2X;
		var combinedY	= vector1Y + vector2Y;

		var angle		= radiansToDegrees( Math.atan(combinedY / combinedX) );
		var magnitude	= Math.sqrt( Math.pow(combinedX, 2) + Math.pow(combinedY, 2) );

		_self.setDirection(angle);
		_self.setMagnitude(magnitude);
	}

	_self.ricochet = function(flipX, flipY, elasticity = 1) {
		var xMagnitude = _self.getX();
		var yMagnitude = _self.getY();

		if( flipX ) {
			console.log('flippping X');
			xMagnitude *= (-1 * elasticity);
		}
		if( flipY ) {
			console.log('flippping Y');
			yMagnitude *= (-1 * elasticity);
		}

		_self.setMagnitudes(xMagnitude, yMagnitude);
	}

	_self.setDirection = function(degrees) {
		if( typeof(degrees) != 'number' ) {
			throw new Error('Velocity direction component must be a number.');
		}

		// Correct for angles outside of 0-360 range
		while( degrees < 0 ) {
			degrees += 360;
		}
		while( degrees > 360 ) {
			degrees -= 360;
		}

		_direction	= degrees;
		_radians		= degreesToRadians(degrees);
	}

	_self.setMagnitude = function(magnitude) {
		if( typeof(magnitude) != 'number' ) {
			throw new Error('Velocity magnitude component must be a number.');
		}

		_magnitude = Math.abs(magnitude);
	}

	_self.setMagnitudes = function(x, y) {
		var magnitude = Math.sqrt( Math.pow(x, 2) + Math.pow(y, 2) );
		var angle		= radiansToDegrees( Math.atan2(y, x) );

		_self.setDirection(angle);
		_self.setMagnitude(magnitude);
	}

	_self.getX = function() {
		var xMagnitude = Math.cos(_radians) * _magnitude;

		return Math.round(xMagnitude * 1000) / 1000;
	}

	_self.getY = function() {
		var yMagnitude = Math.sin(_radians) * _magnitude;

		return Math.round(yMagnitude * 1000) / 1000;
	}

	_self.getDirection = function() {
		return _direction;
	}
};
