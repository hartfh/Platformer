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
		position:		{x: 98, y: 88},
		sprite:		'player'
	});
	var testAsset2 = _assetGenerator.addComponent({
		handle:		'test-asset-2',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 1, y: 1},
		sprite:		'player'
	});
	var testAsset3 = _assetGenerator.addComponent({
		handle:		'test-asset-3',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 34, y: 1},
		sprite:		'player'
	});
	var testAsset4 = _assetGenerator.addComponent({
		handle:		'z-test-asset-4',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 55, y: 40},
		sprite:		'multi1'
	});
	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		110,
		width:		110,
		grid:		mainGrid,
		gridPos:		{x: 50, y: 1},
		screenPos:	{x: 1, y: 1}
	});

	_self.draw = function() {
		// TODO: determine which viewports need to be redrawn. or have them specified in arguments
		var layers = _layerGenerator.getComponents();

		_viewportGenerator.eachComponent(function(viewport, handle) {
			viewport.draw(layers);
		});
	}

	_self.draw();

	var testRun = 0;

	if( testRun ) {
		setInterval(function() {
			vport.shift('e');
			//testAsset2.shift('s');
			_self.draw();
		}, 100);
	}
};
