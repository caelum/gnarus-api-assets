#!/usr/bin/env bash
set -e
cd ..
php -S 0.0.0.0:9080 &
cd bin
echo "Reduzindo tamanhos dos svgs"
node roda-svgo.js $(git diff HEAD~1 HEAD --name-only | grep -iE *api.*svg)
echo "Gerando png dos icones de curso..."
node gera-cursos-png.js $1
# echo "Gerando png dos icones de categorias..."
# node gera-categorias-png.js $1
 if [ "${1}" == "aluralingua" ]; then
 	echo "Gerando png dos icones de carreira..."
 	node gera-carreiras-png.js $1
 fi
echo "Gerando as imagens de share..."
node gera-img-share.js $1
killall -9 php
