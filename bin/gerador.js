var fs = require('fs');
var webshot = require('webshot');

var pluralizacao = {
	'formacao': 'formacoes/',
	'curso': 'cursos/',
	'path': 'paths/',
	'projeto': 'projetos/',
	'categoria': 'categorias/'
};

var geradorDeGeraProxima = function (array, tipo, url, width, height, env) {
	var options = {
	  screenSize: {
	    width: width,
	    height: height
	  }
	, shotSize: {
	    width: width,
	    height: height
	  }
	};

	var geraProxima = function() {
		var elemento = array.pop();

		if (elemento) {
			var arquivo = __dirname + '/../'+ env +'/assets/api/' + pluralizacao[tipo] + width + '/' + elemento + '.png';

			if (!fs.existsSync(arquivo)) {
				webshot(url + elemento + '.svg', arquivo, options, function(err) {
					console.log(tipo + '-' + elemento);
					if (err) console.error(err);
					geraProxima();
				});
			} else {
				geraProxima();
			}

		}
	};
	return geraProxima;
}

module.exports = geradorDeGeraProxima;