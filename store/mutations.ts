import { stateMap, eventMap, leagueMap, subscriptionMap } from '@/interfaces';
import Vue from 'vue';

export default {
	setAwait: (state :stateMap, [ wait, name ] :[ boolean, string ]) :void => {
		state.await[name] = wait;
	},

	setEvent: (state :stateMap, eventData :eventMap) :void => {
		Vue.set(
			state.events,
			eventData.id,
			eventData
		);
	},
	setLeague: (state :stateMap, leagueData :leagueMap) :void => {
		Vue.set(
			state.leagues,
			leagueData.id,
			leagueData
		);
	},

	removeEvent: (state :stateMap, id :string) :void => {
		Vue.delete(state.events, id);
	},

	setSubscription: (state :stateMap, subData :subscriptionMap) :void => {
		Vue.set(
			state.subscriptions,
			subData.username+'_'+subData.city,
			subData
		);
	},
};
