//random sequence in range [start,end]
function notRepeatedRandomInt(start, end, count){
	var randomArr = [];

	start = parseInt(start);
	end = parseInt(end);
	count = parseInt(count);

	if(isNaN(start) || isNaN(end) || start > end || isNaN(count) || count <= 0){
		return randomArr
	}

	for(var i = start; i <= end; i ++){
		randomArr.push(i);
	}
	var length = end - start + 1;
	for(var i = 0; i < length; i ++){
		var randomInt = Math.floor(Math.random() * length);
		if(randomInt != i){
			var temp = randomArr[i];
			randomArr[i] = randomArr[randomInt];
			randomArr[randomInt] = temp;
		}
	}
	if(length <= count){
		return randomArr;
	}else{
		return randomArr.slice(0, count);
	}
}