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
	media :MediaChunk
	alt :string
	title :string
}

export interface eventMap {
	[parameter :string]: any
}

// store
export interface stateMap {
	//se il server sta svolgendo qualche tipo di operazione su cui è meglio non accavallarne altre finché non ha finito
	await: {
		[name :string] :boolean
	},
	events: {
		[event_id :string] :eventMap
	}

	//ultima volta che ho updatato dei dati:
	lastUpdate: {
		// numero fisso perché prendo tutto insieme
		events :number
		// oggetto con key-value per ognuno di essi
		event: {
			[event_id :string]: number
		}
	}
	// tempo minimo prima di un refresh
	refresh: {
		events :number
		event :number
	}
}
