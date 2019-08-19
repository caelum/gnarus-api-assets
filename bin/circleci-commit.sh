set -e
./generate-png-circleci.sh alura
php geradorDeCores.php -i alura
./generate-png-circleci.sh musicdot
php geradorDeCores.php -i musicdot
./generate-png-circleci.sh alurastart
php geradorDeCores.php -i alurastart
./generate-png-circleci.sh aluralingua
php geradorDeCores.php -i aluralingua

git config --global user.email "botcommiter@caelum.com.br"
git config --global user.name "Bot Commitero"
cd ..
git remote
git add .
git commit -m "Gerando Share Images [ci skip]"
git push -q -u origin ${CIRCLE_BRANCH}
USERS["claudio"]="O Commiteiro"
USER_IMGS["claudio"]="\"icon_emoji\":\":cassio_alegre:\""

CHANNEL="#alura_build"
MESSAGE="O CircleCI gerou as cores e as share-images na branch ${CIRCLE_BRANCH}. Veja aqui https://github.com/caelum/gnarus-api-assets/commit/$(git log -n 1 --pretty=format:'%H')"

DATA="payload={\"type\":\"message\",\"text\":\"$MESSAGE\",\"thread_ts\":\"1489097792.053209\",\"channel\":\"$CHANNEL\",\"username\":\"${USERS[$USERNAME]}\",${USER_IMGS[$USERNAME]}}"
curl -X POST --data-urlencode "$DATA" https://hooks.slack.com/services/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