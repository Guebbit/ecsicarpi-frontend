import { stateMap } from '@/interfaces';


export default () :stateMap => {
	return {
		await: {},
		events: {},
		lastUpdate: {
			events: 0,
			event: {},
		},
		// 60K = 60 secondi = 1 minuto
		// 43.200K = 12 ore
		refresh: {
			events: 43200000,
			event: 43200000,
		}
	}
}
