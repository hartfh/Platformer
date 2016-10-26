var Grid = function(config) {
	this.width	= config.width || 0;
	this.height	= config.height || 0;
	this.nodes	= [];

	for(var x = 0; x < this.width; x++) {
		var column = [];

		for(var y = 0; y < this.height; y++) {
			column.push( new Node() );
		}

		this.nodes.push(column);
	}

	for(var x = 0; x < this.width; x++) {
		for(var y = 0; y < this.height; y++) {
			this.addNode(x, y);
		}
	}
};

/**
 * Add a new node into the provided coordinates.
 *
 * @param		{integer}		x
 * @param		{integer}		y
 */
Grid.prototype.addNode = function(x, y) {
	//this.removeNode(x, y);

	var north = this.getNode(x, y - 1);
	var south = this.getNode(x, y + 1);
	var east	= this.getNode(x + 1, y);
	var west	= this.getNode(x - 1, y);

	var args = {
		x:		x,
		y:		y,
		north:	north,
		south:	south,
		east:	east,
		west:	west
	};


	var node = new Node(args);

	this.nodes[x][y] = node;

	// Get adjacent nodes and link them to the new one
	if( north ) { north.addLink('s', node); }
	if( south ) { south.addLink('n', node); }
	if( east ) { east.addLink('w', node); }
	if( west ) { west.addLink('e', node); }
}

/**
 * Passes each node to a callback function.
 *
 * @param		{function}	callback	Callback function. Break the loop by returning true
 */
Grid.prototype.eachNode = function(callback) {
	for(var x in this.nodes) {
		var column = this.nodes[x];

		for(var y in column) {
			var node = column[y];

			if( callback(node, x, y) ) {
				break;
			}
		}
	}
}

/**
 * Checks if an X- and Y-coordinate are within this object's dimensions.
 *
 * @param		{integer}		x
 * @param		{integer}		y
 * @return	{boolean}
 */
Grid.prototype.withinBounds = function(x, y) {
	if( x >= this.width || x < 0 ) {
		return false;
	}
	if( y >= this.height || y < 0 ) {
		return false;
	}

	return true;
}

/**
 * Get the node at the provided coordinates.
 *
 * @param		{integer}		x
 * @param		{integer}		y
 * @return	{object}
 */
Grid.prototype.getNode = function(x, y) {
	if( this.withinBounds(x, y) ) {
		return this.nodes[x][y];
	}

	return false;
}
