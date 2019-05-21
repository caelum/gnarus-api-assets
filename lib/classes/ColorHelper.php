<?php

require dirname( __FILE__ )."/../vendor/rgb-hsl.php";
require dirname( __FILE__ )."/../vendor/rgb-hex.php";

class ColorHelper {

	static function corBgAPartirDe($cor) {
		$cor = strtoupper($cor);
		
		$tabela = [
			'#FC9D9A' => '#E28D8A',
			'#E28D8A' => '#D87C7C',
			'#FF6B6B' => '#E56060',
			'#E56060' => '#CE5252',
			'#FE4365' => '#E43C5A',
			'#E43C5A' => '#D8274D',

			'#CFF09E' => '#B9D78D',
			'#B9D78D' => '#B0CE7C',
			'#87D69B' => '#79C08B',
			'#79C08B' => '#65AA72',
			'#C3FF68' => '#AFE55D',
			'#AFE55D' => '#9FD344',

			'#7ED0D6' => '#71BAC0',
			'#71BAC0' => '#52A8AA',
			'#4ECDC4' => '#46B8B0',
			'#46B8B0' => '#38A399',
			'#00DFFC' => '#00C8E2',
			'#00C8E2' => '#00B3D1',

			'#EAF27E' => '#D2D971',
			'#D2D971' => '#C7C961',
			'#FDCF72' => '#FCC34F',
			'#FCC34F' => '#F7B541',
			'#FFC787' => '#FFB969',
			'#FFB969' => '#F9AE64',

			'#B9D7D9' => '#A6C1C2',
			'#A6C1C2' => '#94B2B2',
			'#F56991' => '#DC5E82',
			'#DC5E82' => '#CE527C',
			'#F799FF' => '#E589EF',
			'#E589EF' => '#D579E2',
		];
		
		if (isset($tabela[$cor])) {
			return $tabela[$cor];	
		} else {
			return $cor;
		}
	}

	static function corPredominanteSVG($file) {
		$svg = str_replace("\n", "", file_get_contents($file));
		preg_match_all('/#[a-fA-F0-9]{6}/i', $svg, $matches);

		$cores = $matches[0];

		// tira cinzas e brancos
		$cores = array_filter($cores, function($cor) {
			$rgb = hex2rgb($cor);
			if ($rgb[0] == $rgb[1] && $rgb[0] == $rgb[2]) return false;
			return true;
		});

		// ordena pela menor luminosidade
		usort($cores, function($a, $b){
			$hsl_a = rgb2hsl(hex2rgb($a));
			$hsl_b = rgb2hsl(hex2rgb($b));
			return $hsl_a[2] > $hsl_b[2];
		});

		return $cores[0];
	}

	static function corBgDadoSvg($file) {
		return ColorHelper::corBgAPartirDe(ColorHelper::corPredominanteSVG($file));
	}

}