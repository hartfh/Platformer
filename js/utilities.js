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

function getSpriteImage(code) {
	var path		= 'assets/';
	var spriteImg	= path + SPRITE_KEY[code];

	return spriteImg;
}
