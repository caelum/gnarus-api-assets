#!/usr/bin/env bash

if [ ! "$1" ]; then
	echo "Forneça algum site( alura ou musicdot)"
	exit 1
fi
cd ..
npm install
php -S 0.0.0.0:9080 $1.php &
cd bin
echo "Gerando png dos icones de curso..."
node gera-cursos-png.js $1
if [ "${1}" == "alura" ]; then
	echo "Gerando png dos icones de formacao..."
	node gera-formacoes-png.js $1
fi	
echo "Gerando as imagens de share..."
node gera-img-share.js $1
echo "Reduzindo tamanhos dos svgs"
node roda-svgo.js $(git status --porcelain  | cut -c4- | grep -E "\.svg")
cd ..
git status
read -p "Veja se criou os arquivos certos e aperte y para confirmar ou n para cancelar " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
   killall -9 php
   exit 1
fi
git add $1/assets/api
git commit -m "Adicionando icones e gerando imagem de share e versoes em png"
git push
killall -9 php
