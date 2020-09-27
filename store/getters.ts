import { stateMap, eventMap } from '@/interfaces';

export default {
	debug: (state: stateMap) => {
		return state;
	},

	getEvents: (state: stateMap) :{ [event_id :string] :eventMap } => {
		return state.events;
	},
	getEvent: (state: stateMap) => (event_id: string) :eventMap | boolean => {
		if(!state.events.hasOwnProperty(event_id))
			return false;
		return state.events[event_id];
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
