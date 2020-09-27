import axios from 'axios';
import { eventMap } from '@/interfaces';


export default{
	//TODO mettere motivazione loading, getAwait default: global, se no "specifico"
	setAwait: ({ commit } :any, [ wait, name ] :[ boolean, string ]) :void => {
		commit("setAwait", [ wait, name ]);
	},

	getEvents: async ({ getters, commit } :any, forced :boolean = false) :Promise<any> => {
		//se il dato è ancora nuovo, non faccio la richiesta e tengo i dati vecchi
		if(!forced && (getters.getEventsLastupdate + getters.getEventsRefresh > Date.now()))
			return false;

		return axios.get('https://mangabeats.api.guebbit.com/events').then(data => {
			for(let i :number = data.data.length; i--; )
				commit("setEvent", data.data[i]);
			/*
			return data.data.map((event :eventMap) => {
				return event;
			})
			*/
			return data;
		})
	},
};
