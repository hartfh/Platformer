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

	var pointError	= new Error('Arguments much each be a coordinate object with x- and y-properties.');
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

function degreesToRadians(degrees) {
	return Math.PI * degrees / 180;
}

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

function boxesOverlapX(box1, box2) {
	if( box1.start.x <= box2.end.x && box1.end.x >= box2.start.x ) {
		return true;
	}

	return false;
}

function boxesOverlapY(box1, box2) {
	if( box1.start.y <= box2.end.y && box1.end.y >= box2.start.y ) {
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

/**
 * DEPRECATED?
 *
 * Translates a sprite code into a path to an image file.
 *
 * @param		{string}	code		The sprite's key in the SPRITE_KEY lookup table
 * @return	{string}			An image file path
 */
function getSpriteImage(code) {
	if( typeof(code) != 'string' || !SPRITE_KEY.hasOwnProperty(code) ) {
		throw new Error('Sprite code does not refer to an image file. Check Asset configuration or SPRITE_KEY.');
	}

	var directory	= 'assets/';
	var spritePath	= directory + SPRITE_KEY[code];

	return spritePath;
}
