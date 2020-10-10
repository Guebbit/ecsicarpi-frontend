import { stateMap, eventMap, mediaMap } from '@/interfaces';
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

	// LAST UPDATES
	getEventsLastupdate: (state: stateMap) => {
		return state.lastUpdate.events;
	},
	getEventLastupdate: (state: stateMap) => (id: string) => {
		if(!state.lastUpdate.event.hasOwnProperty(id))
			return 0;
		return state.lastUpdate.event[id];
	},
};
