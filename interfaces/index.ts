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
