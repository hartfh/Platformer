var PlatformerApp = function(config) {
	if( typeof(config) != 'object' ) {
		throw('PlatformerApp missing required parameters for configuration.');
	}

	var _self				= this;
	var _layerGenerator		= new ComponentGenerator(Layer, _self);
	var _viewportGenerator	= new ComponentGenerator(Viewport, _self);
	var _pxGridGenerator	= new ComponentGenerator(PixelGrid, _self);
	var _assetGenerator		= new ComponentGenerator(Asset, _self);

	// Consider having Layer, Viewport and Grid (and Asset?) all extend a basic Component class.

	var mainGrid = _pxGridGenerator.addComponent({
		handle:		'test-grid',
		width:		880,
		height:		560
	});
	var testLayer = _layerGenerator.addComponent({
		handle:		'test-layer',
		height:		600,
		width:		900
	});

	var testAssetA = _assetGenerator.addComponent({
		handle:		'test-asset-A',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 101, y: 101},
		sprite:		'player',
		velocity:		{magnitude: 0, direction: 315},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		100.00
	});
	var testAssetB = _assetGenerator.addComponent({
		handle:		'test-asset-B',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 350, y: 240},
		sprite:		'player',
		velocity:		{magnitude: 6, direction: 135},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		300.00
	});
	var testAssetC = _assetGenerator.addComponent({
		handle:		'test-asset-B',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 350, y: 120},
		sprite:		'player',
		velocity:		{magnitude: 0, direction: 135},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		300.00
	});
	var testAssetD = _assetGenerator.addComponent({
		handle:		'test-asset-B',
		grid:		mainGrid,
		layer:		testLayer,
		position:		{x: 260, y: 280},
		sprite:		'player',
		velocity:		{magnitude: 0, direction: 135},
		acceleration:	{magnitude: 0.0, direction: 0},
		mass:		300.00
	});

	/*
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
	*/

	/*
	for(var i = 0; i < 20; i++) {
		var randX = Math.floor( Math.random() * 800 );
		var randY = Math.floor( Math.random() * 530 );
		var randDir = Math.floor( Math.random() * 360 );
		var randMass = Math.floor( Math.random() * 500 );

		var test = _assetGenerator.addComponent({
			handle:		'test-asset',
			grid:		mainGrid,
			layer:		testLayer,
			position:		{x: randX, y: randY},
			sprite:		'player',
			velocity:		{magnitude: 4, direction: randDir},
			acceleration:	{magnitude: 0.00, direction: 0},
			mass:		randMass
		});
	}
	*/

	var vport = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		400,
		width:		600,
		grid:		mainGrid,
		gridPos:		{x: 1, y: 1},
		screenPos:	{x: 20, y: 20}
	});
	var vport2 = _viewportGenerator.addComponent({
		handle:		'test-vport',
		height:		230,
		width:		230,
		grid:		mainGrid,
		gridPos:		{x: 210, y: 100},
		screenPos:	{x: 650, y: 200}
	});

	_self.getAsset = function(assetHandle) {
		return _assetGenerator.getComponent(assetHandle);
	}

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

	//testAssetA.move();
	//testAssetB.move();
	//testAssetB.move();
	//testAssetB.move();

	vport2.pinToAsset(testAssetB.getHandle());

	vport.raycast({x: 300, y: 200}, 45);

	_self.draw();

	/*
	GENERAL NOTES:

	Ideas:
	Underwater setting.
	Vessel has "hard points" that upgrades can be affixed to.
	Upgrades: weapons, shields, detection equipment (lights, x-ray, sonar, motion sensor)
	Attached upgrades work automatically. Possibly inclue some programmable logic for one/all upgrades.
	Or hard-points can each have settings, e.g. sweep, track(?), adjust to vessel motion.

	Features:
	Implement ray-casting
	Repeating asset sprites?
	Parallaxing backgrounds/layers
	*/


	const INTERVAL = 50;
	if( 0 ) {
		setInterval(function() {
			gameTime += INTERVAL;

			/*
			_assetGenerator.eachComponent(function(asset, handle) {
				asset.move();
			});
			*/

			testAssetB.move();

			/*
			testAsset.move();
			testAsset2.move();
			testAsset3.move();
			testAsset4.move();
			testAsset4.cycle(gameTime);
			*/
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
