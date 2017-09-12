// lancement par "casperjs openfisca.js"

var casper = require("casper").create({
  verbose: true,
  logLevel: 'debug',
});

var site = 'https://api-test.openfisca.fr/variables';

casper.start(site);

casper.then(function() {
  var currentURL = this.getCurrentUrl();
  this.echo('URL: ' + currentURL);
  var variablesJSON = JSON.parse(this.getPageContent());
  var variables = Object.keys(variablesJSON);
  //require('utils').dump(json_string);
  console.log(variables.length +"variables");

  variables.forEach(function(variable) {
    console.log(variable);
    var urlVar = "https://api-test.openfisca.fr/variable/"+variable;
    console.log(urlVar);
  });

});

casper.run();
