// gera todas as share images com node e phantomjs
var env = process.argv[2];

var geradorDeGeraProxima = require('./gerador');
var coletorDeSlugsLocal = require('./coletor-de-slugs-local');

// config
var url =  'http://0.0.0.0:9080/'+env+'/assets/api/cursos/';
var cursos = coletorDeSlugsLocal("../" + env + "/assets/api/cursos/");
var geraCursos = geradorDeGeraProxima(cursos, 'curso', url, 512, 512, env);
var geraCursosPeq = geradorDeGeraProxima(cursos.slice(0), 'curso', url, 128, 128, env);

geraCursos();
geraCursosPeq();
