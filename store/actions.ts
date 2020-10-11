import axios from 'axios';
import { eventMap } from '@/interfaces';


//TODO guebbit
const toFormData = (obj :any, form :FormData | null = null, namespace :string | null = null) => {
	var fd = form || new FormData(),
		formKey:string;
	for(var property in obj) {
		if(obj.hasOwnProperty(property)) {
			if(namespace)
				formKey = namespace + '[' + property + ']';
			else
				formKey = property;
			// if the property is an object, but not a File,
			// use recursivity.
			if(typeof obj[property] === 'object' && !(obj[property] instanceof File))
				toFormData(obj[property], fd, property);
			else
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
		}
	}
	return fd;
}


export default{
	//TODO mettere motivazione loading, getAwait default: global, se no "specifico"
	setAwait: ({ commit } :any, [ wait, name ] :[ boolean, string ]) :void => {
		commit("setAwait", [ wait, name ]);
	},

	getEvents: async ({ getters, commit } :any) :Promise<any> => {
		//se il dato è ancora nuovo, non faccio la richiesta e tengo i dati vecchi
		if(getters.getEventsLastupdate + getters.getEventsRefresh > Date.now())
			return false;
		return axios.get(process.env.apiUrl+'events').then(data => {
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
	//TODO
	getEventsById: async ({ dispatch } :any, id_event :string) :Promise<any> => {
		//TODO fare bene
		return dispatch("getEvents");
	},
	getEventsByUri: async ({ dispatch } :any, uri :string) :Promise<any> => {
		//TODO fare bene
		return dispatch("getEvents");
	},


	addEvent: async ({} :any, eventData :eventMap) :Promise<any> => {
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		eventData = {
			"uri": "testttttttttttt",
			"title": "test"
		};
		return axios.post(process.env.apiUrl+'events', toFormData(eventData)).then(data => {
			console.log("POSTTTTTTTTTTTTT", data.data);
			return data;
		})
	},

	editEvent: async ({} :any, eventData :eventMap) :Promise<any> => {
		axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
		eventData = {
			"uri": "testttttttttttt",
			"title": "test"
		};
		var test :any = {
			headers: {
				//'Content-Type': 'application/json',
				'Content-Type': 'multipart/form-data',
				'X-Requested-With': 'XMLHttpRequest',
			}
		};
		return axios.put(process.env.apiUrl+'events/3', toFormData(eventData)).then(data => {
			console.log("PUTTTTTTTTTTTTT", data.data);
			return data;
		})
	},





	addSubscription: async ({} :any,  [event_id, paypal_id, create_time, email, username, city] :string[] ) :Promise<any> => {
		const postRequest :any = toFormData({
			event_id,
			paypal_id,
			create_time,
			email,
			username,
			city,
		});
		alert("REGISTRATO!" + username + " con mail " + email);
		return;
		return axios.post(process.env.apiUrl+'subscription', postRequest).then(data => {
			console.log("POSTTTTTTTTTTTTT", data.data);
			return data;
		})
	},
};
