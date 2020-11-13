import { stateMap, eventMap, mediaMap, MediaChunk } from '@/interfaces';
import Search from '@/assets/js/temporaryGuebbit/search'

export default {
	debug: (state: stateMap) => {
		return state;
	},

	getEvent: (state: stateMap) => (event_id: string) :eventMap | boolean => {
		if(!state.events.hasOwnProperty(event_id))
			return false;
		return state.events[event_id];
	},
	//in ordine dal più nuovo
	getEvents: (state: stateMap) :eventMap[] => {
		return Object.values(state.events).sort(({ data_start: a } :eventMap, { data_start: b } :eventMap) => {
			return new Date(b).getTime() - new Date(a).getTime();
		});
	},
	//solo quelli attivi e in arrivo //TODO ordine per importanza (pagamento, valore custom, appartenente ad una lega)
	getEventsActive: (state: stateMap, getters :any) :eventMap[] => {
		return getters.getEvents.filter(({ data_start, data_end } :eventMap) => {
			return new Date().getTime() <= new Date(data_end ? data_end : data_start).getTime();
		});
	},
	/* array: ["parameter", "string-to-search"] */
	getEventsByParams: (state: stateMap) => (searchable :[string, string][]) :eventMap[] => {
		return Search(Object.values(state.events), searchable);
	},
	getEventGallery: (state: stateMap) => (event_id: string) :mediaMap[] => {
		if(!state.events.hasOwnProperty(event_id))
			return [];
		if(!state.events[event_id].hasOwnProperty("media") || !state.events[event_id].media)
			return [];
		return state.events[event_id].media;
	},





	getLeagues: (state: stateMap) :eventMap[] => {
		return Object.values(state.leagues).sort(({ data_start: a } :eventMap, { data_start: b } :eventMap) => {
			return new Date(b).getTime() - new Date(a).getTime();
		});
	},
	//solo quelli attivi e in arrivo //TODO ordine per importanza (pagamento, valore custom, appartenente ad una lega)
	getLeaguesActive: (state: stateMap, getters :any) :eventMap[] => {
		return getters.getLeagues.filter(({ data_start, data_end } :eventMap) => {
			return new Date().getTime() <= new Date(data_end ? data_end : data_start).getTime();
		});
	},
	/* array: ["parameter", "string-to-search"] */
	getLeaguesByParams: (state: stateMap) => (searchable :[string, string][]) :eventMap[] => {
		return Search(Object.values(state.leagues), searchable);
	},
	getLeagueGallery: (state: stateMap) => (league_id: string) :mediaMap[] => {
		if(!state.leagues.hasOwnProperty(league_id))
			return [];
		if(!state.leagues[league_id].hasOwnProperty("media") || !state.leagues[league_id].media)
			return [];
		return state.leagues[league_id].media;
	},



	getEventCover: (state: stateMap, getters :any) => (event_id: string) :MediaChunk | false => {
		let gallery :mediaMap[];
		gallery = Object.values(getters.getEventGallery(event_id))
		if(gallery.length < 1)
			return false;
		gallery = gallery.filter(({ role } :mediaMap) => {
			return role === 'cover';
		});
		if(gallery.length < 1)
			return false;
		return gallery[0].MediaChunk;
	},


	// LOADINGS
	getAwait: (state: stateMap) :boolean => {
		//TODO cerco se tra tutti gli ID c'è qualcosa di "true"
		return false;
	},
	//faccio la versione specifica per ogni loading
	getAwaitEvents: (state: stateMap) :boolean => {
		if(!state.await.hasOwnProperty("events"))
			return false;
		return state.await.events;
	},

	// REFRESH TIME
	getEventsRefresh: (state: stateMap) => {
		return state.refresh.events;
	},
	getEventRefresh: (state: stateMap) => {
		return state.refresh.event;
	},
	getLeaguesRefresh: (state: stateMap) => {
		return state.refresh.leagues;
	},
	getLeagueRefresh: (state: stateMap) => {
		return state.refresh.league;
	},

	// LAST UPDATES
	getEventsLastupdate: (state: stateMap) => {
		return state.lastUpdate.events;
	},
	getEventLastupdate: (state: stateMap) => (id: string) => {
		if(!state.lastUpdate.event.hasOwnProperty(id))
			return 0;
		return state.lastUpdate.event[id];
	},
	getLeaguesLastupdate: (state: stateMap) => {
		return state.lastUpdate.leagues;
	},
	getLeagueLastupdate: (state: stateMap) => (id: string) => {
		if(!state.lastUpdate.league.hasOwnProperty(id))
			return 0;
		return state.lastUpdate.league[id];
	},
};
