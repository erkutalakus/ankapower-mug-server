urlize = function(str) {
    if (!str)
        return "";
    let result = str.toLowerCase();
    result = result.replace(/ü/g, 'u');
    result = result.replace(/ğ/g, 'g');
    result = result.replace(/ş/g, 's');
    result = result.replace(/ö/g, 'o');
    result = result.replace(/ç/g, 'c');
    result = result.replace(/ı/g, 'i');
	result = result.replace(/i̇/g, 'i');
    result = result.replace(new RegExp(/[\W_]+/g), '-');
    if (result.endsWith('-')) {
        return result.slice(0, -1);
    } else {
        return result;
    }
};