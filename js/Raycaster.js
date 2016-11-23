var Raycaster = function(config) {
	var _self			= this;
	var _fpoint		= config.focalPoint;
	var _areaWidth		= config.width;
	var _areaHeight	= config.height;
	var _arcDirection	= config.arcDirection;
	var _arcWidth		= config.arcWidth;
	var _points		= [];
	var _edgeTermini	= {};

	// Create a 2-d array of points with dimensions equal to the viewport
	for(var i = 0; i <= _areaWidth; i++) {
		_points[i] = [];

		for(var j = 0; j <= _areaHeight; j++) {
			_points[i][j] = false;
		}
	}

	if( _arcWidth > 360 ) {
		_arcWidth = 360;
	}

	_self.findEdgelines = function() {
		var angleC = normalizeAngle( _arcDirection );
		var angle1 = normalizeAngle( angleC + (_arcWidth / 2) );
		var angle2 = normalizeAngle( angleC - (_arcWidth / 2) );

		var slopeC = Math.tan( degreesToRadians(angleC) );
		var slope1 = Math.tan( degreesToRadians(angle1) );
		var slope2 = Math.tan( degreesToRadians(angle2) );

		var edgeLineData = {
			center:	{
				slope:	slopeC,
				angle:	angleC
			},
			point1:	{
				slope:	slope1,
				angle:	angle1
			},
			point2:	{
				slope:	slope2,
				angle:	angle2
			}
		};

		return edgeLineData;
	}


	_self.findEdgeTermini = function() {
		var edgeTermini = {}; // edge ray end points. coordinates are relative to viewport.
		var edgeLineData = _self.findEdgelines();

		for(var i in edgeLineData) {
			var edgeLineDatum = edgeLineData[i];

			var angle = edgeLineDatum.angle;
			var slope = edgeLineDatum.slope;

			var testX, testY;

			if( angle >= 0 && angle < 180 ) {
				// up
				testY = _areaHeight - _fpoint.y;
			} else {
				// down
				testY = -1 * _fpoint.y;
			}
			if( angle >= 90 && angle <= 270 ) {
				// left
				testX = -1 * _fpoint.x;
			} else {
				// right
				testX = _areaWidth - _fpoint.x;
			}

			var resultX = testY / slope;
			var resultY = slope * testX;

			// testY exceeds an X boundary
			if( resultX + _fpoint.x > _areaWidth || resultX + _fpoint.x < 0 ) {
				edgeTermini[i] = {
					x: Math.round( testX + _fpoint.x ),
					y: Math.round( -1 * resultY + _fpoint.y )
				};
			}
			// testX exceeds a Y boundary
			if( resultY + _fpoint.y > _areaHeight || resultY + _fpoint.y < 0 ) {
				edgeTermini[i] = {
					x: Math.round( resultX + _fpoint.x ),
					y: Math.round( -1 * testY + _fpoint.y )
				};
			}
		}

		return edgeTermini;
	}

	_self.getVerticalEdgeRays = function() {

	}

	// get rays when direction points to left or right area edge
	_self.getHorizontalEdgeRays = function() {
		var xModifier;

		if( _edgeTermini.center.x == _areaWidth ) {
			// right edge
			xModifier = -1;
		} else {
			// left edge
			xModifier = 1;
		}


		for(var k = 0; k < 2; k++) {

			var proceed	= true;
			var difference;

			if(k == 0) {
				var yModifier = 1;
				difference = _areaHeight - _edgeTermini.center.y;
			} else {
				var yModifier = -1;
				difference = _edgeTermini.center.y;
			}

			for(var a = 0; a < difference; a++) {
				var endPoint = {x: _edgeTermini.center.x, y: _edgeTermini.center.y};

				endPoint.y += a * yModifier;

				if( endPoint.x == _edgeTermini.point1.x && endPoint.y == _edgeTermini.point1.y ) {
					console.log('break 1');
					proceed = false;
					break;
				}
				if( endPoint.x == _edgeTermini.point2.x && endPoint.y == _edgeTermini.point2.y ) {
					console.log('break 1.5');
					proceed = false;
					break;
				}
			}
			if( proceed ) {
				for(var b = 0; b < _areaWidth; b++) {
					var endPoint = {x: _edgeTermini.center.x, y: _edgeTermini.center.y};

					endPoint.y += a * yModifier;
					endPoint.x += b * xModifier;

					if( endPoint.x == _edgeTermini.point1.x && endPoint.y == _edgeTermini.point1.y ) {
						console.log('break 2');
						proceed = false;
						break;
					}
					if( endPoint.x == _edgeTermini.point2.x && endPoint.y == _edgeTermini.point2.y ) {
						console.log('break 2.5');
						proceed = false;
						break;
					}
				}
			}
			if( proceed ) {
				for(var c = 0; c < _areaHeight; c++) {
					var endPoint = {x: _edgeTermini.center.x, y: _edgeTermini.center.y};

					endPoint.y += a * yModifier;
					endPoint.x += b * xModifier;
					endPoint.y -= c * yModifier;

					if( endPoint.x == _edgeTermini.point1.x && endPoint.y == _edgeTermini.point1.y ) {
						console.log('break 3');
						break;
					}
					if( endPoint.x == _edgeTermini.point2.x && endPoint.y == _edgeTermini.point2.y ) {
						console.log('break 3.5');
						break;
					}
				}
			}
			console.log(endPoint);
		}
	}


	_edgeTermini = _self.findEdgeTermini();
	console.log(_edgeTermini);

	var first, second, third;
	var increment;
	var max;

	if( _edgeTermini.center.y == _areaHeight ) {
		// start on bottom edge
		console.log('bottom');
		first = 'x';
		second = 'y';
		third = 'x';
		increment = -1;
		// +/-X, then -Y, then -/+X

		_self.getVerticalEdgeRays();
	} else if( _edgeTermini.center.y == 0 ) {
		// start on top edge
		console.log('top');
		first = 'x';
		second = 'y';
		third = 'x';
		increment = 1;
		// +/-X, then +Y, then -/+X

		_self.getVerticalEdgeRays();
	} else if( _edgeTermini.center.x == _areaWidth ) {
		// start on right edge
		console.log('right');
		first = 'y';
		second = 'x';
		third = 'y';
		increment = -1;
		var proceed = true;
		// +/-Y, then -X, then -/+Y

		_self.getHorizontalEdgeRays();
	} else {
		// start on left edge
		console.log('left');
		first = 'y';
		second = 'x';
		third = 'y';
		increment = 1;
		// +/-Y, then +X, then -/+Y

		_self.getHorizontalEdgeRays();
	}
};
