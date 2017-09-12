Openfiscavar

# installation

nécessite  nodejs.


```
git clone https://github.com/scenaristeur/openfiscavar.git
cd openfiscavar
npm install
node .

```

L'appli est ensuite accessible à l'adresse http://localhost:3000

utilise P5js pour loader les données au format JSON et vis.js pour afficher le graphe

pour faire des tests et charger moins de variables, modifier la variable "var testLimite = 10000;" dans public/sketch.js, mettez la à 10 ou 50, par exemple
