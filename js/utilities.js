/**
 * Reconfigures two point objects such that their x and y values are ordered from smallest to largest.
 *
 * @param		{object}	first	First point object
 * @param		{object}	second	Second point object
 * @return	{object}			An object with "start" and "end" point objects.
 */
function sequencePoints(first, second) {
	if( arguments.length != 2 ) {
		throw new Error('Must provide exactly two arguments.');
	}

	var pointError	= new Error('Arguments must each be a coordinate object with x- and y-properties.');
	var points	= [first, second];

	for(var i in points) {
		var point = points[i];

		if( typeof(point) != 'object' ) {
			throw pointError;
		}
		if( !point.hasOwnProperty('x') || !point.hasOwnProperty('y') ) {
			throw pointError;
		}
	}

	var start = {};
	var end	= {};

	start.x	= (first.x < second.x) ? first.x : second.x;
	start.y	= (first.y < second.y) ? first.y : second.y;

	end.x	= (first.x > second.x) ? first.x : second.x;
	end.y	= (first.y > second.y) ? first.y : second.y;

	return {
		start:	start,
		end:		end
	}
}

function getElasticVelocities(m1, m2, v1, v2) {
	var v3 = (v1 * ((m1 - m2) / (m1 + m2))) + (v2 * ((2 * m2) / (m1 + m2)));
	var v4 = (v1 * ((2 * m1) / (m1 + m2))) + (v2 * ( (m2 - m1) / (m1 + m2)));

	return {
		v1:	v3,
		v2:	v4
	}
}

function getElasticVelocities2D(m1, m2, v1, v2, theta1, theta2, phi) {
	v1x = (  (  v1 * Math.cos(theta1 - phi) * (m1 - m2) + (2 * m2 * v2 * Math.cos(theta2 - phi))  ) * Math.cos(phi) / (m1 + m2)   ) + (v1 * Math.sin(theta1 - phi) * Math.cos(phi + 90));
	v1y = (  (  v1 * Math.cos(theta1 - phi) * (m1 - m2) + (2 * m2 * v2 * Math.cos(theta2 - phi))  ) * Math.sin(phi) / (m1 + m2)   ) + (v1 * Math.sin(theta1 - phi) * Math.sin(phi + 90));

	return {
		x:	v1x,
		y:	v1y
	};
}

// Correct for angles outside of 0-360 range
function normalizeAngle(degrees) {
	while( degrees < 0 ) {
		degrees += 360;
	}
	while( degrees > 360 ) {
		degrees -= 360;
	}

	return degrees;
}

function degreesToRadians(degrees) {
	return Math.PI * degrees / 180;
}

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

function boxesOverlapX(box1, box2) {
	if( box1.start.x <= box2.end.x && box1.end.x >= box2.start.x ) {
		console.log('overlap X');
		return true;
	}

	return false;
}

function boxesOverlapY(box1, box2) {
	if( box1.start.y <= box2.end.y && box1.end.y >= box2.start.y ) {
		console.log('overlap Y');
		return true;
	}

	return false;
}

function boxesOverlap(box1, box2) {
	if( box1.start.x <= box2.end.x && box1.end.x >= box2.start.x ) {
		if( box1.start.y <= box2.end.y && box1.end.y >= box2.start.y ) {
			return true;
		}
	}

	return false;
}

function getLinePoints(origin, terminus) {
	var points = [];

	if( origin.x == terminus.x && origin.y == terminus.y ) {
		return points;
	}

	var slope = (terminus.y - origin.y) / (terminus.x - origin.x);

	if( Math.abs(slope) > 1 ) {
		slope = (terminus.x - origin.x) / (terminus.y - origin.y);

		if( origin.y < terminus.y ) {
			var start	= origin;
			var end	= terminus;
		} else {
			var start	= terminus;
			var end	= origin;
		}

		var offset = start.x - slope * start.y;

		for(var y = start.y; y <= end.y; y++) {
			var x = slope * y + offset;
			x = Math.round(x);

			points.push({x: x, y: y});
		}
	} else {
		if( origin.x < terminus.x ) {
			var start	= origin;
			var end	= terminus;
		} else {
			var start	= terminus;
			var end	= origin;
		}

		var offset = start.y - slope * start.x;

		for(var x = start.x; x <= end.x; x++) {
			var y = slope * x + offset;

			y = Math.round(y);

			points.push({x: x, y: y});
		}
	}

	return points;
}
