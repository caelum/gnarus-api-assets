<?php 
require_once dirname( __FILE__ )."/../lib/classes/ViewHelpers.php";

$envie = getopt("i:")['i'];
$envieName = ucfirst($envie);

echo "Gerando as cores da {$envieName}\n";

$coursesPath = "../{$envie}/assets/api/cursos/";
chdir($coursesPath);

$filePathCores = dirname( __FILE__ )."/../{$envie}/assets/api/cores-dos-cursos.yaml";
$filePathDetalhes = dirname( __FILE__ )."/../{$envie}/assets/api/cores-detalhes-cursos.yaml";

$fileCoresDosCursos = fopen($filePathCores, 'w');
$fileCoresDetalhesCursos = fopen($filePathDetalhes, 'w');

foreach(glob('*.svg*') as $courseFile) {
    
    $course =  str_replace(".svg", "", $courseFile);
    
    // esse é o cores dos cursos
    $color = ViewHelpers::corBgDadoSvg(dirname( __FILE__ )."/".$coursesPath.$courseFile);

    $courseWithColor = "{$course}: \"{$color}\""."\n";
    fwrite($fileCoresDosCursos, $courseWithColor);

    // esse é o cores detalhes cursos
    $color = ViewHelpers::corPredominanteSVG(dirname( __FILE__ )."/".$coursesPath.$courseFile);

    $courseWithColor = "{$course}: \"{$color}\""."\n";
    fwrite($fileCoresDetalhesCursos, $courseWithColor);
}
fclose($fileCoresDosCursos);
fclose($fileCoresDetalhesCursos);

?>