import { stateMap } from '@/interfaces';


export default () :stateMap => {
	return {
		await: {},
		events: {},
		leagues: {},
		subscriptions: {},
		lastUpdate: {
			events: 0,
			event: {},
			leagues: 0,
			league: {},
			subscriptions: 0,
		},
		// 36K = 60 secondi = 1 minuto
		// 43.200K = 12 ore
		refresh: {
			events: 43200000,
			event: 43200000,
			leagues: 43200000,
			league: 43200000,
			subscriptions: 36000,
		}
	}
}
