var ComponentGenerator = function(ComponentClass) {
	this.init(ComponentClass);
};

ComponentGenerator.prototype.init = function(ComponentClass) {
	var _ComponentClass		= ComponentClass;
	var _Components		= {};
	var _ComponentCounter	= 0;
	//var _name			= config.name;

	this.addComponent = function(ComponentConfig) {
		var handle = ComponentConfig.name + '-' + _ComponentCounter;

		ComponentConfig.handle = handle;

		var Component = new _ComponentClass(ComponentConfig);

		_Components[handle] = Component;
		_ComponentCounter++;

		return Component;
	}

	this.getComponents = function() {
		return _Components;
	}

	this.eachComponent = function(callback) {
		for(var handle in _Components) {
			var Component = _Components[handle];

			callback(Component, handle);
		}
	}
}

ComponentGenerator.prototype.reorderComponent = function() {
	// ?????
}

ComponentGenerator.prototype.getComponent = function(handle) {
	if( this.Components.hasOwnProperty(handle) ) {
		return this.Components[handle];
	}

	return false;
}

ComponentGenerator.prototype.removeComponent = function(handle) {
	if( this.Components.hasOwnProperty(handle) ) {
		delete this.Components[handle];

		return true;
	}

	return false;
}
