/**
* 	deep copy
*	clone/copia precisa a tutti i layer di un oggetto
*	per evitare di passarlo tramite reference
*	WARNING: basta usare lo spread operator ...
**/
const deepCopy = (obj:object) => {
	let clone:object = {};
	for(let i in obj) {
			//@ts-ignore
		if(obj[i] != null && typeof(obj[i]) == "object")
			//@ts-ignore
			clone[i] = deepCopy(obj[i]);
		else
			//@ts-ignore
			clone[i] = obj[i];
	}
	return clone;
}

export default deepCopy;
