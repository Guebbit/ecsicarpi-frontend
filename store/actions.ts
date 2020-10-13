import axios from 'axios';
import { eventMap, subscriptionRequest } from '@/interfaces';


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



	//TODO
	addEvent: async ({ commit } :any, eventData :eventMap) :Promise<any> => {
		eventData = {
			"uri": "testttttttttttt",
			"title": "test",
		};
		return axios.post(process.env.apiUrl+'events', toFormData(eventData))
			.then(data => {
				console.log("addEvent OK", data.data);
				commit("setEvent", data.data);
				return data;
			})
			.catch(error => {
				if(!error)
					return;
				console.log("addEvent ERROR", error.response.data.messages);
				return error.response.data.messages;
			})
	},
	//TODO
	editEvent: async ({ commit } :any, eventData :eventMap) :Promise<any> => {
		eventData = {
			"id": "10",
			"uri": "changed",
			"title": "changedddddd",
		};
		return axios.post(process.env.apiUrl+'events/'+eventData.id, toFormData({...eventData, "_method": "PUT"}))
			.then(data => {
				console.log("editEvent OK", data.data);
				commit("setEvent", data.data);
				return data;
			})
			.catch(error => {
				if(!error)
					return;
				console.log("editEvent ERROR", error.response.data.messages);
				return error.response.data.messages;
			})
	},
	//TODO
	removeEvent: async ({ commit } :any, id :string) :Promise<any> => {
		return axios.delete(process.env.apiUrl+'events/'+id)
			.then(data => {
				console.log("removeEvent OK", data.data);
				commit("removeEvent", id); //TODO put data.data.id (and test)
				return data;
			})
			.catch(error => {
				if(!error)
					return;
				console.log("removeEvent ERROR", error.response.data.messages);
				return error.response.data.messages;
			})
	},



	getSubscriptions: async ({ commit, getters } :any, event_id :string) :Promise<any> => {
		//se il dato è ancora nuovo, non faccio la richiesta e tengo i dati vecchi
		/*	TODO
		if(getters.getEventsLastupdate + getters.getEventsRefresh > Date.now())
			return false;
		*/
		return axios.get(process.env.apiUrl+'subscriptions/'+event_id).then(data => {
			for(let i :number = data.data.length; i--; )
				commit("setSubscription", data.data[i]);
			return data;
		})
	},
	addSubscription: async ({ commit } :any,  subscriptionData: subscriptionRequest ) :Promise<any> => {
		return axios.post(process.env.apiUrl+'subscriptions', toFormData(subscriptionData))
			.then(data => {
				console.log("setSubscription OK", data.data);
				commit("setSubscription", data.data);
				return data;
			})
			.catch(error => {
				if(!error)
					return;
				console.log("setSubscription ERROR", error.response.data.messages);
				return error.response.data.messages;
			})
	},
};
