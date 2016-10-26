var Node = function(config) {
	var config = config || {};

	this.x		= config.x || false;
	this.y		= config.y || false;
	this.north	= config.north || false;
	this.south	= config.south || false;
	this.east		= config.east || false;
	this.west		= config.west || false;

	this.assets	= [];
};

/**
 * Get this node's coordinates as a point object.
 *
 * @return	{object}
 */
Node.prototype.getCoordinates = function() {
	return {
		x:	this.x,
		y:	this.y
	};
}

/**
 * Get the node at a provided link.
 *
 * @param		{string}	direction
 * @return	{object}	node
 */
Node.prototype.getLink = function(direction) {
	var node;

	switch(direction) {
		case 'n':
			node = this.north;
			break;
		case 'e':
			node = this.east;
			break;
		case 's':
			node = this.south;
			break;
		case 'w':
			node = this.west;
			break;
		default:
			node = false;
			break;
	}

	return node;
}

/**
 * Create a link from this node to another node.
 *
 * @param		{string}	direction
 * @param		{object}	node
 */
Node.prototype.addLink = function(direction, node) {
	switch(direction) {
		case 'n':
			this.north = node;
			break;
		case 'e':
			this.east = node;
			break;
		case 's':
			this.south = node;
			break;
		case 'w':
			this.west = node;
			break;
		default:
			break;
	}
}

/**
 * Remove one of this node's links to another node.
 *
 * @param		{string}	direction
 */
Node.prototype.removeLink = function(direction) {
	switch(direction) {
		case 'n':
			this.north = false;
			break;
		case 'e':
			this.east = false;
			break;
		case 's':
			this.south = false;
			break;
		case 'w':
			this.west = false;
			break;
		default:
			break;
	}
}

/**
 * Passes each linked node to a callback function.
 *
 * @param		{function}	callback
 */
Node.prototype.eachLink = function(callback) {
	for(var i in DIRECTIONS) {
		var dir = DIRECTIONS[i];
		console.log(dir);

		var node	= this.getLink(dir);

		if( node ) {
			if( callback(node) ) {
				break;
			}
		}
	}
}
