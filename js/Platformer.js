var PlatformerApp = function(config) {
	if( typeof(config) != 'object' ) {
		throw('PlatformerApp missing required parameters for configuration.');
	}

	var _self				= this;
	var _layerGenerator		= new ComponentGenerator(Layer);
	var _viewportGenerator	= new ComponentGenerator(Viewport);
	var _pxGridGenerator	= new ComponentGenerator(PixelGrid);
	var _assetGenerator		= new ComponentGenerator(Asset);

	// Consider having Layer, Viewport and Grid (and Asset?) all extend a basic Component class

	var mainGrid = _pxGridGenerator.addComponent({
		handle:		'test-grid',
		width:		880,
		height:		540
	});
	_layerGenerator.addComponent({
		handle:		'test-layer'
	});
	var testAsset = _assetGenerator.addComponent({
		handle:		'test-asset',
		grid:		mainGrid,
		position:		{x: 102, y: 102},
		height:		10,
		width:		10
	});
	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		300,
		width:		300,
		grid:		mainGrid,
		gridPos:		{x: 20, y: 20}
	});

	_assetGenerator.eachComponent(function(component, handle) {
		console.log(component);
		console.log(handle);
	});

	/*
	this.draw = function() {
		_self.eachViewport(function(viewport) {
			// draw all layers
			// viewport.draw();
		});
	}
	*/
};
