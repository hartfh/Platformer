var PlatformerApp = function(config) {
	if( typeof(config) != 'object' ) {
		throw('PlatformerApp missing required parameters for configuration.');
	}

	var _self				= this;
	var _layerGenerator		= new ComponentGenerator(Layer);
	var _viewportGenerator	= new ComponentGenerator(Viewport);
	var _pxGridGenerator	= new ComponentGenerator(PixelGrid);
	var _assetGenerator		= new ComponentGenerator(Asset);

	// Consider having Layer, Viewport and Grid (and Asset?) all extend a basic Component class.

	var mainGrid = _pxGridGenerator.addComponent({
		handle:		'test-grid',
		width:		880,
		height:		540
	});
	var testLayer = _layerGenerator.addComponent({
		handle:		'test-layer',
		height:		600,
		width:		900
	});
	var testAsset = _assetGenerator.addComponent({
		handle:		'test-asset-0',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 98, y: 108},
		sprite:		'player',
		velocity:		{magnitude: 0.7, direction: 350},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		500.00
	});
	var testAsset2 = _assetGenerator.addComponent({
		handle:		'test-asset-2',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 1, y: 1},
		sprite:		'player',
		velocity:		{magnitude: 0.0, direction: 0},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		100.00
	});
	var testAsset3 = _assetGenerator.addComponent({
		handle:		'test-asset-3',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 34, y: 1},
		sprite:		'player',
		velocity:		{magnitude: 0.5, direction: 310},
		acceleration:	{magnitude: 0.0, direction: 310},
		mass:		200.00
	});
	var testAsset4 = _assetGenerator.addComponent({
		handle:		'z-test-asset-4',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 55, y: 52},
		sprite:		'multi1',
		velocity:		{magnitude: 0, direction: 0},
		acceleration:	{magnitude: 0.00, direction: 0},
		mass:		50.00
	});
	var testAsset5 = _assetGenerator.addComponent({
		handle:		'z-test-asset-5',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 200, y: 100},
		sprite:		'player',
		velocity:		{magnitude: 2, direction: 160},
		acceleration:	{magnitude: 0.00, direction: 0},
		mass:		75.00
	});
	var testAsset6 = _assetGenerator.addComponent({
		handle:		'z-test-asset-6',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 100, y: 300},
		sprite:		'player',
		velocity:		{magnitude: 2, direction: 80},
		acceleration:	{magnitude: 0.00, direction: 0},
		mass:		75.00
	});
	var testAsset7 = _assetGenerator.addComponent({
		handle:		'z-test-asset-7',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 500, y: 400},
		sprite:		'player',
		velocity:		{magnitude: 2, direction: 75},
		acceleration:	{magnitude: 0.00, direction: 0},
		mass:		175.00
	});
	var testAsset8 = _assetGenerator.addComponent({
		handle:		'z-test-asset-8',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 400, y: 400},
		sprite:		'player',
		velocity:		{magnitude: 1, direction: 125},
		acceleration:	{magnitude: 0.00, direction: 0},
		mass:		275.00
	});
	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		434,
		width:		610,
		grid:		mainGrid,
		gridPos:		{x: 1, y: 1},
		screenPos:	{x: 20, y: 20}
	});
	/*
	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		210,
		width:		210,
		grid:		mainGrid,
		gridPos:		{x: 100, y: 100},
		screenPos:	{x: 650, y: 200}
	});
	*/

	_self.draw = function() {
		// TODO: determine which viewports need to be redrawn? Or have them specified in arguments
		var layers = _layerGenerator.getComponents();

		_viewportGenerator.eachComponent(function(viewport, handle) {
			viewport.draw(layers);
		});
	}

	_self.tick = function() {
		// do everything that fits into one game tick

		// viewports should be active/inactive
	}

	_self.pause = function() {
		// clear setInterval
	}

	_self.resume = function() {
		// setup setInterval
	}

	//testAsset4.move(); testAsset4.cycle(gameTime);

	var gameTime = 1;
	var oldTime = performance.now();

	_self.draw();


	const INTERVAL = 20; // current lowest time interval game can seem to run at
	if( 0 ) {
		setInterval(function() {
			gameTime += INTERVAL;

			testAsset.move();
			testAsset2.move();
			testAsset3.move();
			testAsset4.move();
			testAsset5.move();
			testAsset6.move();
			testAsset7.move();
			testAsset8.move();
			testAsset4.cycle(gameTime);
			//testAsset3.accelerate();

			/*
			var newTime = performance.now();
			console.log( Math.round(newTime - oldTime));
			oldTime = newTime;
			*/

			_self.draw();
		}, INTERVAL);
	}
};
