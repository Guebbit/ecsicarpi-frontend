
/**
*
*
**/
export default (haystack :any[], needles:[string, string][], mode :string = "AND") :any[] => {
	let filteredArray :any[] = haystack.filter((item :any) => {
		let i :number,
			result :boolean;
		switch (mode) {
			case "AND":
				result = true;
				for(i = needles.length; i--; )
					if(!item.hasOwnProperty(needles[i][0]) || item[needles[i][0]] !== needles[i][1])
						result = false;
			break;
			case "OR":
				result = false;
				for(i = needles.length; i--; )
					if(item.hasOwnProperty(needles[i][0]) && item[needles[i][0]] === needles[i][1])
						result = true;
			break;
			default:
				result = false;
			break;
		}
		return result;
	});
	return filteredArray;
}
