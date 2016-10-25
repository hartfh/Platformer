var Grid = function(config) {
	this.width	= config.width || 0;
	this.height	= config.height || 0;
	this.nodes = [];

	for(var j = 0; j < this.width; j++) {
		var column = [];

		for(var i = 0; i < this.height; i++) {
			column.push( new Node() );
		}

		this.nodes.push(column);
	}

	for(var j = 0; j < this.width; j++) {
		for(var i = 0; i < this.height; i++) {
			//this.addNode(j, i);
		}
	}
};

Grid.prototype.addNode = function() {
	
}
