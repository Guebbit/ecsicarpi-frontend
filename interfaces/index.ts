export interface MediaChunk {
	url :string
	thumb800 :string
	thumb100 :string
	chunkType :string
}

export interface mediaMap {
	name :string
	MediaChunk :MediaChunk
	alt :string
	title :string
	role? :string
}

export interface partnerMap {
	id :string
	name :string
	url :string
	role :string
	MediaChunk :MediaChunk
	alt :string
	title :string
}

export interface eventMap {
	//TODO
	[parameter :string]: any
}

export interface subscriptionMap {
	//TODO
	[parameter :string]: any
}
export interface subscriptionRequest {
	event_id? :string
	payment_id? :string
	payment_type? :string
	email? :string
	username :string
	city? :string
}




// store
export interface stateMap {
	//se il server sta svolgendo qualche tipo di operazione su cui è meglio non accavallarne altre finché non ha finito
	await: {
		[name :string] :boolean
	},
	events: {
		[event_id :string] :eventMap
	},
	subscriptions: {
		[subscription_id :string] :subscriptionMap
	},

	//ultima volta che ho updatato dei dati:
	lastUpdate: {
		// numero fisso perché prendo tutto insieme
		events :number
		// oggetto con key-value per ognuno di essi
		event: {
			[event_id :string]: number
		}
		subscriptions: number
	}
	// tempo minimo prima di un refresh
	refresh: {
		events :number
		event :number
		subscriptions :number
	}
}
