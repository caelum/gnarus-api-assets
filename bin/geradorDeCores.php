<?php 
require_once dirname( __FILE__ )."/../lib/classes/ColorHelper.php";

$envie = getopt("i:")['i'];
$envieName = ucfirst($envie);

echo "Gerando as cores da {$envieName}\n";

$coursesPath = "../{$envie}/assets/api/cursos/";

$filePathCores = dirname( __FILE__ )."/../{$envie}/api/cores-dos-cursos";
$filePathDetalhes = dirname( __FILE__ )."/../{$envie}/api/cores-detalhes-cursos";

$fileCoresDosCursos = fopen($filePathCores, 'w');
$fileCoresDetalhesCursos = fopen($filePathDetalhes, 'w');

chdir($coursesPath);
foreach(glob('*.svg*') as $courseFile) {
    
    $course =  str_replace(".svg", "", $courseFile);
    
    // esse é o cores dos cursos
    $color = ColorHelper::corBgDadoSvg(dirname( __FILE__ )."/".$coursesPath.$courseFile);

    $courseWithColor = "{$course}: \"{$color}\""."\n";
    fwrite($fileCoresDosCursos, $courseWithColor);

    // esse é o cores detalhes cursos
    $color = ColorHelper::corPredominanteSVG(dirname( __FILE__ )."/".$coursesPath.$courseFile);

    $courseWithColor = "{$course}: \"{$color}\""."\n";
    fwrite($fileCoresDetalhesCursos, $courseWithColor);
}
fclose($fileCoresDosCursos);
fclose($fileCoresDetalhesCursos);

?>