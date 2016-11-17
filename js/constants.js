const DIRECTIONS = {
	'o':		{
		x:	0,
		y:	0
	},
	'n':		{
		x:	0,
		y:	-1
	},
	'ne':	{
		x:	1,
		y:	-1
	},
	'e':		{
		x:	1,
		y:	0
	},
	'se':	{
		x:	1,
		y:	1
	},
	's':		{
		x:	0,
		y:	1
	},
	'sw':	{
		x:	-1,
		y:	1
	},
	'w':		{
		x:	-1,
		y:	0
	},
	'nw':	{
		x:	-1,
		y:	-1
	}
};

const SPRITE_KEY = {
	'player':			{
		height:	32,
		width:	32,
		sprites:	[
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 0},
				time:		false,
				repeat:		false,
				images:		['test-sprite-1.png']
			}
		],
		hitboxes:		[
			{
				start:	{x:	0,	y:	0},
				end:		{x:	32,	y:	32}
			}
		]
	},
	'repeater':		{
		height:	32,
		width:	32,
		sprites:	[
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 0},
				time:		false,
				repeat:		false,
				images:		['test-sprite-2.png']
			}
		],
		hitboxes:		[
			{
				start:	{x:	0,	y:	0},
				end:		{x:	32,	y:	32}
			}
		]
	},
	/*
	'error':			{
		height:	32,
		width:	32,
		sprites:	[
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 0},
				image:		'test-sprite-3.png'
			}
		]
	},
	*/
	'multi1':			{
		height:	64,
		width:	64,
		sprites:	[
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 0},
				time:		false,
				repeat:		false,
				images:		['multisprite-1.png']
			},
			{
				height:		32,
				width:		32,
				origin:		{x: 32, y: 0},
				time:		false,
				repeat:		false,
				images:		['multisprite-2.png']
			},
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 32},
				time:		1000,
				repeat:		false,
				images:		['multisprite-3.png', 'multisprite-3-2.png']
			},
		],
		hitboxes:		[
			{
				start:	{x:	0,	y:	0},
				end:		{x:	32,	y:	32}
			},
			{
				start:	{x:	32,	y:	0},
				end:		{x:	64,	y:	32}
			},
			{
				start:	{x:	0,	y:	32},
				end:		{x:	32,	y:	64}
			}
		]
	}
}

const TICK_TIME = 100; // milliseconds

const ASSETS_PATH = 'assets/';

const APP_CONTAINER_ID = 'platformer-app-container';
