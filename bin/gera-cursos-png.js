// gera todas as share images com node e phantomjs
var env = process.argv[2];

var geradorDeGeraProxima = require('./gerador');
var coletorDeSlugsLocal = require('./coletor-de-slugs-local');

var spawn = require("child_process").spawn
var execFile = require("child_process").execFile

var child = spawn("ls", ["-lF", "/rooot"])

child.stdout.on("data", function (data) {
    console.log("spawnSTDOUT:", JSON.stringify(data))
})

child.stderr.on("data", function (data) {
    console.log("spawnSTDERR:", JSON.stringify(data))
})

child.on("exit", function (code) {
    console.log("spawnEXIT:", code)
})

//child.kill("SIGKILL")

execFile("ls", ["-lF", "/usr"], null, function (err, stdout, stderr) {
    console.log("execFileSTDOUT:", JSON.stringify(stdout))
    console.log("execFileSTDERR:", JSON.stringify(stderr))
})

setTimeout(function () {
    phantom.exit(0)
}, 2000)

// config
var url =  'http://0.0.0.0:9080/'+env+'/assets/api/cursos/';
var cursos = coletorDeSlugsLocal("../" + env + "/assets/api/cursos/");
var geraCursos = geradorDeGeraProxima(cursos, 'curso', url, 512, 512, env);
var geraCursosPeq = geradorDeGeraProxima(cursos.slice(0), 'curso', url, 128, 128, env);

geraCursos();
geraCursosPeq();
