module.export = function convertArrayToReadableStr(array){
	var readableStr = '';
	for(var i = 0; i < array.length; i++){
		if(i === (array.length - 1)){
			readableStr += `and ${array[i]}.`;
		}
		else {
			readableStr += `${array[i]},`;
		}
	}
	return readableStr;
}