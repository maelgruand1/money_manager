@echo off
echo Deploiement de l'application sur GitHub Pages...

:: Construire l'application
npx react-scripts build

:: Déployer l'application sur GitHub Pages
npx gh-pages -d build -b gh-pages --repo https://github.com/maelgruand1/money_manager.git

echo Deploiement termine avec succes !
pause
