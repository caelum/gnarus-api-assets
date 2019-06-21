// gera todas as share images com node e phantomjs
// gera todas as share images com node e phantomjs
var env = process.argv[2];

var geradorDeGeraProxima = require('./gerador');
var coletorDeSlugsLocal = require('./coletor-de-slugs-local');

// config
var urlCarreira = 'http://localhost:9080/'+env+'/assets/api/carreiras/';

var carreiras = coletorDeSlugsLocal("../"+env+"/assets/api/carreiras/");

var geraCarreiras = geradorDeGeraProxima(carreiras, 'carreira', urlCarreira, 512, 512, env);
var geraCarreirasPeq = geradorDeGeraProxima(carreiras.slice(0), 'carreira', urlCarreira, 128, 128, env);

geraCarreiras();
geraCarreirasPeq();

var urlCarreira = 'http://localhost:9080/'+env+'/assets/api/modules/';

var carreiras = coletorDeSlugsLocal("../"+env+"/assets/api/modules/");

var geraCarreiras = geradorDeGeraProxima(carreiras, 'module', urlCarreira, 512, 512, env);
var geraCarreirasPeq = geradorDeGeraProxima(carreiras.slice(0), 'module', urlCarreira, 128, 128, env);

geraCarreiras();
geraCarreirasPeq();