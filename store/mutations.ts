import { stateMap, eventMap } from '@/interfaces';
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
};
