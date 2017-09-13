

//var files = ["https://api-test.openfisca.fr/variables"];
// load the JSON file containing the Gephi network.
//var variablesJSON = loadJSON(variablesUrl); // code in importing_from_gephi.

//console.log(variablesJSON);



  // create an array with nodes
  var nodes = new vis.DataSet([
  /*  {id: 1, label: 'Node 1'},
    {id: 2, label: 'Node 2'},
    {id: 3, label: 'Node 3'},
    {id: 4, label: 'Node 4'},
    {id: 5, label: 'Node 5'},
    {id: 6, label: 'Node 6'},
    {id: 7, label: 'Node 7'},
    {id: 8, label: 'Node 8'}*/
  ]);

  // create an array with edges
  var edges = new vis.DataSet([
  /*  {from: 1, to: 8, arrows:'to', dashes:true},
    {from: 1, to: 3, arrows:'to'},
    {from: 1, to: 2, arrows:'to, from'},
    {from: 2, to: 4, arrows:'to, middle'},
    {from: 2, to: 5, arrows:'to, middle, from'},
    {from: 5, to: 6, arrows:{to:{scaleFactor:2}}},
    {from: 6, to: 7, arrows:{middle:{scaleFactor:0.5},from:true}}*/
  ]);

  // create a network
  var container = document.getElementById('mynetwork');
  var data = {
    nodes: nodes,
    edges: edges
  };
  var options = {
    autoResize: true,
  /*  configure: {
   enabled: true,
   filter: 'nodes,edges',
   container: undefined,
   showButton: true
 },*/
interaction:{
  navigationButtons: true,
  keyboard: {
    enabled: true,
    speed: {x: 10, y: 10, zoom: 0.02},
    bindToWindow: true
  },

},
    physics:{
    enabled: true,
    barnesHut: {
      gravitationalConstant: -600,
      centralGravity: 0.01,
      springLength: 300,
      springConstant: 0.08,
      damping: 0.8,
      avoidOverlap: 1
    },
    forceAtlas2Based: {
      gravitationalConstant: -500,
      centralGravity: 0.0001,
      springConstant: 0.08,
      springLength: 300,
      damping: 0.1
    },
    /*    forceAtlas2Based: {
          gravitationalConstant: -600,
          centralGravity: 0.001,
          springConstant: 0.08,
          springLength: 200,
          damping: 0.1
        },
        */
    repulsion: {
      centralGravity: 0.01,
      springLength: 300,
      springConstant: 0.08,
      nodeDistance: 500,
      damping: 0.8
    },
    hierarchicalRepulsion: {
      centralGravity: 0.01,
      springLength: 300,
      springConstant: 0.08,
      nodeDistance: 5000,
      damping: 0.8
    },
    maxVelocity: 5000,
    minVelocity: 0.1,
    solver: 'forceAtlas2Based',
    stabilization: {
      enabled: true,
      iterations: 1000,
      updateInterval: 100,
      onlyDynamicEdges: false,
      fit: true
    },
    timestep: 0.5,
    adaptiveTimestep: true
  }

  };
  var network = new vis.Network(container, data, options);
