// gera todas as share images com node e phantomjs

var env = process.argv[2];
var fs = require('fs');
var webshot = require('webshot');
var request = require('sync-request');
var width = 2400;
var height= 1260;

// pega dados reais
function collectSlugs(url, model) {
  var res = makeRequest(url);
  var body = res.getBody();
  var data = JSON.parse(body);

  var slugs = [];
  for (var i = 0; i < data.length; i++) {
    if (model == 'carreiras') {
      var carreiras = data[i]['carreiras'];
      for (var j = 0; j < carreiras.length; j++) {
        slugs.push(carreiras[j]['slug']);
      }
    }
		else if (model == 'formacoes') {
				slugs.push(data[i]['code']);
    }
    else {
      slugs.push(data[i]['slug']);
    }
  }
  return slugs;
}

// screenshoteador
var options = {
  screenSize: {
    width: width
    , height: height
  }
  , shotSize: {
    width: width
    , height: height
  }
};

function makeRequest(url){
  console.log(url);
  return request('GET', url, {
    'headers': {
      'user-agent': "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36"
    }
  });
}

function geradorDeGeraProxima (array, tipo, url) {
  var geraProxima = function() {
    var elemento = array.pop();

    if (elemento) {
      var arquivo = __dirname + '/../'+env+'/assets/api/share/' + tipo + '-' + elemento + '.png';
      var urlShare = url + elemento;
      if (!fs.existsSync(arquivo) && makeRequest(urlShare)['statusCode']=='200') {
        webshot(urlShare, arquivo, options, function(err) {
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

// categorias
if (["alura", "alurastart", "musicdot", "aluralingua"].indexOf(env) >= 0) {
  var urlCategoria = 'https://www.'+env+'.com.br/_share-img-categoria?slug=';
  var apiCategorias = 'https://cursos.'+env+'.com.br/api/categorias';
  var categorias = collectSlugs(apiCategorias, 'categorias');
  var geraCategorias = geradorDeGeraProxima(categorias, 'categoria', urlCategoria, env);
  geraCategorias();
}

// cursos
if (["alura", "alurastart", "musicdot", "aluralingua"].indexOf(env) >= 0) {
  var urlCurso = 'https://www.'+env+'.com.br/_share-img-curso?slug=';
  var apiCursos = 'https://cursos.'+env+'.com.br/api/cursos';
  var cursos = collectSlugs(apiCursos, 'cursos');
  var geraCursos = geradorDeGeraProxima(cursos, 'curso', urlCurso, env);
  geraCursos();
}

// carreiras
if (["aluralingua"].indexOf(env) >= 0) {
  var urlCarreira = 'https://www.'+env+'.com.br/_share-img-carreira?slug=';
  var apiCarreiras = 'https://cursos.'+env+'.com.br/api/carreiras';
  var carreiras = collectSlugs(apiCarreiras, 'carreiras');
  var geraCarreiras = geradorDeGeraProxima(carreiras, 'carreira', urlCarreira, env);
  geraCarreiras();
}

// formacoes
if (["alura"].indexOf(env) >= 0) {
	var urlFormacao = 'https://www.'+env+'.com.br/_share-img-formacao?slug=';
	var apiFormacoes = 'https://cursos.'+env+'.com.br/api/guia-de-aprendizado/lista-formacao';
	var formacoes = collectSlugs(apiFormacoes, 'formacoes');
	var geraFormacoes = geradorDeGeraProxima(formacoes, 'formacao', urlFormacao, env);
	geraFormacoes();
}
