const DIRECTIONS = {
	'n':		{
		x:	0,
		y:	-1
	},
	'e':		{
		x:	1,
		y:	0
	},
	's':		{
		x:	0,
		y:	1
	},
	'w':		{
		x:	-1,
		y:	0
	},
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

const ASSETS_PATH = 'assets/';

/*
const SPRITE_KEY = {
	'background':		'test-sprite-2.png',
	'error':			'test-sprite-3.png',
	'multi-1':		'multisprite-1.png',
	'multi-2':		'multisprite-2.png',
	'multi-3':		'multisprite-3.png',
	'player':			'test-sprite-1.png'
};
*/

const APP_CONTAINER_ID = 'platformer-app-container';
