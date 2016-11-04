var ComponentGenerator = function(ComponentClass) {
	this.init(ComponentClass);
};

ComponentGenerator.prototype.init = function(ComponentClass) {
	var _self				= this;
	var _ComponentClass		= ComponentClass;
	var _Components		= {};
	var _ComponentCounter	= 0;

	_self.addComponent = function(ComponentConfig) {
		var handle = ComponentConfig.handle + '-' + _ComponentCounter;

		ComponentConfig.handle = handle;

		var Component = new _ComponentClass(ComponentConfig);

		_Components[handle] = Component;
		_ComponentCounter++;

		return Component;
	}

	_self.removeComponent = function(handle) {
		if( _Components.hasOwnProperty(handle) ) {
			var component = _Components[handle];

			component.destroy();

			delete _Components[handle];

			return true;
		}

		return false;
	}

	_self.getComponents = function() {
		return _Components;
	}

	_self.getComponent = function(handle) {
		if( _Components.hasOwnProperty(handle) ) {
			return _Components[handle];
		}

		return false;
	}

	_self.eachComponent = function(callback) {
		for(var handle in _Components) {
			var Component = _Components[handle];

			callback(Component, handle);
		}
	}
}

ComponentGenerator.prototype.reorderComponent = function() {
	// ?????
}
