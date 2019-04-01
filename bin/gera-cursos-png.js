// gera todas as share images com node e phantomjs
var env = process.argv[2];

var geradorDeGeraProxima = require('./gerador');
var coletorDeSlugsLocal = require('./coletor-de-slugs-local');

// config
var urlCurso = 'https://www.alura.com.br/assets/api/cursos/';
var cursos = coletorDeSlugsLocal("../" + env + "/assets/api/cursos/");
var geraCursos = geradorDeGeraProxima(cursos, 'curso', urlCurso, 512, 512, env);
var geraCursosPeq = geradorDeGeraProxima(cursos.slice(0), 'curso', urlCurso, 128, 128, env);

geraCursos();
geraCursosPeq();
