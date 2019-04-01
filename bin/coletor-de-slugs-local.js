var fs = require('fs');

// esse arquivo pega todos os arquivos svg em um diretório e devolve uma lista com o nome deles
var collectSlugs = function (location) {
	var iconNames = fs.readdirSync(location);
	iconNames = iconNames.filter(isSvg);
	var slugs = iconNames.map(getSlug);

	return slugs;
}

function isSvg(fileName){
	if(fileName.match(".svg")) return true;
	return false;
}

function getSlug(iconName){
	return iconName.replace(".svg", "");
}

module.exports = collectSlugs;