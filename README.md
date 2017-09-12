Openfiscavar

# installation

nécessite  nodejs. ou avec python (https://github.com/processing/p5.js/wiki/Local-server), ou utilisez autre serveur web, dans ce cas, seul le repertoire public est nécessaire.


```
git clone https://github.com/scenaristeur/openfiscavar.git
cd openfiscavar
npm install
node .

```

L'appli est ensuite accessible à l'adresse http://localhost:3000

utilise P5js pour loader les données au format JSON et vis.js pour afficher le graphe

pour faire des tests et charger moins de variables, modifier la variable "var testLimite = 2000;" dans public/sketch.js, mettez la à 10 ou 50, par exemple
