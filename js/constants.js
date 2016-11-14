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
				image:		'test-sprite-1.png'
			}
		]
	},
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
	'multi1':			{
		height:	64,
		width:	64,
		sprites:	[
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 0},
				image:		'multisprite-1.png'
			},
			{
				height:		32,
				width:		32,
				origin:		{x: 32, y: 0},
				image:		'multisprite-2.png'
			},
			{
				height:		32,
				width:		32,
				origin:		{x: 0, y: 32},
				image:		'multisprite-3.png'
			},
		]
	}
}

const TICK_TIME = 100; // milliseconds

const ASSETS_PATH = 'assets/';

const APP_CONTAINER_ID = 'platformer-app-container';
