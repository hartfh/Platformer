var ComponentGenerator = function(ComponentClass, engine) {
	this.init(ComponentClass, engine);
};

ComponentGenerator.prototype.init = function(ComponentClass, engine) {
	var _self				= this;
	var _ComponentClass		= ComponentClass;	// A class to be instantiated when adding components
	var _components		= {};			// A container for all components tracked as they're generated
	var _componentCounter	= 0;				// Used to create a unique ID for each component. Incremented with each new component
	var _engine			= engine;

	/**
	 * Instantiates a new object of type _ComponentClass and adds it to _components.
	 *
	 * @param		{object}	componentConfig	Configuration object for the component to be instantiated
	 * @return	{object}
	 */
	_self.addComponent = function(componentConfig) {
		var handle = componentConfig.handle + '-' + _componentCounter;

		componentConfig.handle = handle;
		componentConfig.engine = _engine;

		var component = new _ComponentClass(componentConfig);

		_components[handle] = component;
		_componentCounter++;

		return component;
	}

	/**
	 * Removes a component from the _components container.
	 *
	 * @param		{string}	handle	The component's handle
	 */
	_self.removeComponent = function(handle) {
		if( _components.hasOwnProperty(handle) ) {
			var component = _components[handle];

			component.destroy();

			delete _components[handle];
		}
	}

	/**
	 * Get private _components property.
	 *
	 * @return	{object}
	 */
	_self.getComponents = function() {
		return _components;
	}

	/**
	 * Gets a component by its handle.
	 *
	 * @param		{string}	handle	The component's handle
	 * @return	{object}			Returns false if no component by that handle exists
	 */
	_self.getComponent = function(handle) {
		if( _components.hasOwnProperty(handle) ) {
			return _components[handle];
		}

		return false;
	}

	/**
	 * Loops through all components and passes them to a callback function.
	 *
	 * @param		{function}	callback		A callback function. Gets passed a component and its handle as arguments. Returning false will break the loop.
	 */
	_self.eachComponent = function(callback) {
		for(var handle in _components) {
			var component	= _components[handle];
			var response	= callback(component, handle);

			// Break if the callback returns false
			if( typeof(response) != 'undefined' ) {
				if( !response ) {
					break;
				}
			}
		}
	}
}

ComponentGenerator.prototype.reorderComponent = function() {
	// ?????
}
