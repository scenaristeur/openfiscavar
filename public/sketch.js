var variablesJSON;
var variablesURL = [];
var variables =[];
var variablesDetails = [];
var variable;
var edges2add = [];
var testLimite = 200;
function preload() {
  // Get the most recent earthquake in the database
  var url = 'https://api-test.openfisca.fr/variables';
  variablesJSON = loadJSON(url,populateVars);
}

function setup() {
  createCanvas(displayWidth,50);
  textSize(10);
  textAlign(CENTER);
  //frameRate(30);
  //noLoop();
  console.log(network);
}

function draw() {
  background(200);

  if ((variables.length > 0) && (testLimite > 0 )  ){ // && (frameCount %5 == 0) && (testLimite > 0 )
    variable = variables.shift();
    var id = variable;
    var x = Math.floor(Math.random() *  width/2+10) + width/2-10 ;
      var y = Math.floor(Math.random() *  height/2-10) +  height/2-10 ;
    nodes.add({ id: id, label: id, group: 1, type: "variable", x: x, y: y  });
    getDetail(variable);
    testLimite--;
      network.fit();
  }else{

    if (variablesDetails.length > 0 && (Math.round(frameCount) % 2 == 0)){
      var variableDet = variablesDetails.shift();
      traiteDetails(variableDet);
        network.fit();
    }
  }

  if (variable){
    text(variable , width/4, height/2);
    text(variables.length, width/2, height/2);
    var fps = Math.round(frameRate())+"fps";
    text(fps, width*0.75, height/2);
  }

}

function populateVars(vars){
  console.log(vars);
  variables = Object.keys(vars);
  variables.forEach(function(variable) {
    traitementVariable(variable);
  });
}

function getDetail(variable){
  var urlVar = "https://api-test.openfisca.fr/variable/"+variable;
  var varJSON = loadJSON(urlVar, varOk, errorVar );
}

function varOk(variableDetail){
  variablesDetails.push(variableDetail);
  //console.log(variablesDetails.length);


}

function traiteDetails(variableDetail){
  //  traitementVariable(variableDetail);
  traitementEntity(variableDetail);
  traitementFormulas(variableDetail);
}

function errorVar(data){
  //console.log("err :"+data);
}
function traitementVariable(variable){

}
function traitementEntity(variableDetail){
  var id = variableDetail.id;
  var entity = variableDetail.entity;
  //  console.log(entity);
  var nodeExistEntity = nodes.get (entity);
  if (!nodeExistEntity){
    //  console.log(nodeExistEntity);
    nodes.add({ id: entity,   group: 2, type: "entity"});
  }
  edges.add({ from: id, to: entity ,  label: "entity", arrows : "to"});
}

function traitementFormulas(variableDetail){
  var id = variableDetail.id;
  var formulas = variableDetail.formulas;
  //console.log(id);
  var dates = Object.keys(formulas);
  if (dates.length >0){
    //  console.log(dates);
    dates.forEach(function(date) {
      //  console.log(date);
      //   console.log(formulas[date].content);
      if( formulas[date] != null){
        var defs = formulas[date].content.trim().split("def ");

        //  console.log("L"+defs.length);
        defs.forEach(function(def) {
      //    console.log(defs);
          def = def.trim();
          if(def != ""){



          // console.log("--"+def);
          // recup parametres de def
          if(def.startsWith("formula(")){
          //  console.log(def);
            var firstcut = def.split("(");
            if (firstcut.length>1){
              // console.log(firstcut[1]);
              var secondcut = firstcut[1].split("\)");
              if(secondcut[0].length > 0){
                var parametres = secondcut[0].split(",");
                if(parametres.length >0){
            //      console.log(parametres);
                  parametres.forEach(function(parametre) {
                    var nodeExist = nodes.get (parametre);
                    //      console.log(nodeExist);
                    if (!nodeExist){
                      //      console.log(nodeExist);
                      nodes.add({ id: parametre,   group: 3, type: "parametre"});
                    }
                    if (nodeExist && nodeExist.type != "entity"){
                      edges.add({ from: id, to: parametre ,  label: "utilise", arrows : "to"});
                    }
                  });
                }
              }
            }
          }else {
            //  console.log(def);
            var retourFunction = def.trim();
            if(retourFunction != ""){
              var fonctionAppel = def.split(":")[0];
            //  console.log(fonctionAppel);
              var firstcutF = fonctionAppel.split("(");
              var fonction = firstcutF[0];
          //    console.log(fonction);
              var nodeExist = nodes.get (fonction);

              if (!nodeExist){
                //      console.log(nodeExist);
                nodes.add({ id: fonction,   group: 4, type: "fonction"});
              }
              edges.add({ from: id, to: fonction ,  label: "return", arrows : "to"});



              var secondcutF = firstcutF[1].split("\)");
              if(secondcutF[0].length > 0){
                var parametresF = secondcutF[0].split(",");
              //  console.log(parametresF);
                if(parametresF.length >0){
              //    console.log(parametresF);
                  parametresF.forEach(function(parametreF) {
                    var nodeExistPF = nodes.get (parametreF);
                    //      console.log(nodeExist);
                    if (!nodeExistPF){
                      //      console.log(nodeExist);
                      nodes.add({ id: parametreF,   group: 3, type: "parametreF"});
                    }
                    var edgeExistPF = edges.get({
  filter: function (item) {
    return (item.from == fonction && item.to ==parametreF && item.label == "utilise" && item.arrows == "to");
  }
});
      if (!edgeExistPF){
                    edges.add({ from: fonction, to: parametreF ,  label: "utilise", arrows : "to"});
                  }
                  });
                }
              }
            }
          }
          }
        });
      }
    });
  }
}
