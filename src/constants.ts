export const CONTROLS = {
	forward: 'forward',
	backward: 'backward',
	left: 'left',
	right: 'right',
	jump: 'jump',
} as const;

export const ROAD_LENGTH = 100;
export const ROAD_WIDTH = 20;
export const CAR_SPEED = 0.1
export const CAR_SPEED_MOBILE = 0.4;

export const MOUNTAIN_WIDTH = 10;
export const MOUNTAIN_HEIGHT = 3;
export const SEGMENTS = 50;

export const BARRIER_HEIGHT = 1;
export const BARRIER_WIDTH = 0.3;
export const BARRIER_OFFSET_X = ROAD_WIDTH / 2 - 0.1;
export const BARRIER_OFFSET_Y = BARRIER_HEIGHT / 2 + 0.5;

export const LEG_HEIGHT = 0.6;
export const LEG_SPACING = 5;
export const LEG_WIDTH = 0.5;
export const LEG_LENGTH = 0.2;

export const SQUARE_SIZE = 300;
export const SMOKE_THICKNESS = 1;
export const PARTICLE_COUNT = 30000;

export const MARKERS = [
	{
		position: [-ROAD_WIDTH / 4, 0, ROAD_LENGTH - 65] as [
			number,
			number,
			number,
		],
		imageUrl: '/cv.png',
		text: 'CV',
		url: 'https://drive.google.com/file/d/1CIQIvaJCudzHOnXLaMysZra-_mUMt2Hk/view?usp=sharing',
	},
	{
		position: [ROAD_WIDTH / 4, 0, ROAD_LENGTH - 75] as [number, number, number],
		imageUrl: '/npm-logo.png',
		text: 'NPM пакет useLocalStorage',
		url: 'https://www.npmjs.com/package/uselocalstorage-ts',
	},
	{
		position: [-ROAD_WIDTH / 4, 0, ROAD_LENGTH - 85] as [
			number,
			number,
			number,
		],
		imageUrl: '/npm-logo.png',
		text: 'NPM пакет usePointerSwipe',
		url: 'https://www.npmjs.com/package/usepointerswipe-ts',
	},
	{
		position: [ROAD_WIDTH / 4, 0, ROAD_LENGTH - 95] as [number, number, number],
		imageUrl: '/github.png',
		text: 'GITHUB',
		url: 'https://github.com/D33key',
	},
	{
		position: [-ROAD_WIDTH / 4, 0, ROAD_LENGTH - 105] as [
			number,
			number,
			number,
		],
		imageUrl: '/tg.png',
		text: 'Telegram',
		url: 'https://t.me/dimask1s',
	},
];
