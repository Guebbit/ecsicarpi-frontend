/*
WARNING TODO, mettere l'opzione di nascondere "weeks" se uguale a 0 (oppure non nasconderlo). Se si fa manualmente, è necessario usare "total_" per l'ordine di tempo più alto, altrimenti è come tagliare i l'"1" di "1200" che viene solo "200"
*/

export default class timerHelper{
	constructor(callback, date=new Date(), settings={}){
		this.settings = {
			"lang": {
				"months": 	["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
				"days": 	["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
			}
		};
		/*
		if (typeof Guebbit === "undefined") {
			console.log("timerHelper: Guebbit needed for Guebbit.extend settings");
		}else{
			this.settings=Guebbit.extend(this.settings, settings);
		}
		*/

		if(!isNaN(date)) 				date=new Date(date*1000);
		if(!(typeof date === "object")) date=new Date(date);

		this.callback=callback;
		// Time calculations for days, hours, minutes, etc
		this.calculations = {                                                                  // structure
		    years: 31536000,
		    months: 2592000,
		    weeks: 604800,
		    days: 86400,
		    hours: 3600,
		    minutes: 60,
		    seconds: 1
		};
		this.date={
			"object":		date,
			"timestamp":	Math.floor( date.getTime() / 1000),
			"dd-mm-yyyy":	date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear(),
			"yyyy-mm-dd":	date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate(),
			"day":			date.getDate(),
			"month":		(date.getMonth()+1),
			"dayname":		this.settings.lang.days[date.getDate()],
			"monthname":	this.settings.lang.months[date.getMonth()+1],
		};
		this.start();
	}
	start(){
		var self=this;
		this.interval=setInterval(function(){
			// Get day's date and time
			var now = Math.floor( new Date().getTime() / 1000),
			// Find the distance between now and the count down date
				timestamp_distance = self.date.timestamp - now,
			// same, but this will go gradually to 0 during calculations
				depletion_distance = timestamp_distance,
			// Array of converted distances
				distance = {};

			Object.keys(self.calculations).forEach(function(key){
				distance["total_"+key] = Math.floor(timestamp_distance / self.calculations[key]);
				distance[key] = Math.floor(depletion_distance / self.calculations[key]);
				depletion_distance -= distance[key] * self.calculations[key];
			});

			self.callback.call(self, distance);
		},1000);
	}
	stop(){
		window.clearInterval(this.interval);
	}
	getLast(mode, day=new Date()){
		switch(mode) {
			case "week":
				return new Date(day.getFullYear(), day.getMonth(), day.getDate()-7);
				break;
			case "month":
				return new Date(day.getFullYear(), day.getMonth()-1, day.getDate());
				break;
			case "year":
				return new Date(day.getFullYear()-1, day.getMonth(), day.getDate());
				break;
		}
		return false;
	}
}
