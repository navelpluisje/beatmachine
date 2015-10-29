function uFirst(string) {
    var i = 1,
        res;

    if (string === '') {
    	return string;
    }

    res = string[0].toUpperCase();

    for (i; i < string.length; i += 1) {
        res += string[i];
    }
    
    return res;
}
