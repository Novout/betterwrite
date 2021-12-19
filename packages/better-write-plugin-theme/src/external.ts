import { BetterWriteThemes } from 'better-write-types';

export const setEditorLogo = (theme: BetterWriteThemes, utils: any) => {
	let logo = '';

	switch (theme) {
		case 'BetterWrite - Dark':
		case 'BetterWrite - Light':
			logo = utils.path().resolve('logo_default.svg');
			break;
		case 'BetterWrite - Rise':
			logo = utils.path().resolve('logo_rise.svg');
			break;
		case 'BetterWrite - Harmonic':
			logo = utils.path().resolve('logo_harmonic.svg');
			break;
		case 'BetterWrite - Ascend':
			logo = utils.path().resolve('logo_ascend.svg');
			break;
		default:
			logo = utils.path().resolve('logo_default.svg');
			break;
	}

	return logo;
};
