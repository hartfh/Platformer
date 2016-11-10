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
	var testLayer = _layerGenerator.addComponent({
		handle:		'test-layer',
		height:		900,
		width:		1200
	});
	var testAsset = _assetGenerator.addComponent({
		handle:		'test-asset',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 102, y: 102},
		height:		10,
		width:		10,
		sprite:		'player'
	});
	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		120,
		width:		120,
		grid:		mainGrid,
		gridPos:		{x: 10, y: 10}
	});

	_self.draw = function() {
		// TODO: determine which viewports need to be redrawn. or have them specified in arguments
		//var layers = _layerGenerator.getComponents();

		_viewportGenerator.eachComponent(function(viewport, handle) {
			viewport.draw();
		});
	}

	_self.draw();
};
