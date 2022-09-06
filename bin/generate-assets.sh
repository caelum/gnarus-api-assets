set -e
#./generate-png-circleci.sh alura
#php geradorDeCores.php -i alura
#./generate-png-circleci.sh musicdot
#php geradorDeCores.php -i musicdot
./generate-png-circleci.sh alurastart
php geradorDeCores.php -i alurastart
#./generate-png-circleci.sh aluralingua
#php geradorDeCores.php -i aluralingua

#cd ..
#git remote
#git add .
#git commit -m "Gerando Share Images [ci skip]"
#git push -q -u origin ${BRANCH_NAME}
