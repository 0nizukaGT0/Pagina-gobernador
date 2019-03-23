//ROOT VARIABLES
let chamber = 'house'; //house || senate
let congress = '113'; //102-115
const url = `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`;
const apiKey = 'cf9RM1umZPJ6MoCiiFrwPRDF7NjccEPqPMfiTEfv';
const header = {
  method: 'GET',
  headers: {
    'X-API-Key': apiKey
  }
};

var app = new Vue({
  el: '#statics',
  data: {
    statics: []
  }
});
var app2 = new Vue({
  el: '#lest-members',
  data: {
    members: []
  },
  methods: {
    linkMember: function(urlMember) {
      window.open(urlMember, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    }
  }
});
var app3 = new Vue({
  el: '#most-members',
  data: {
    members: []
  },
  methods: {
    linkMember: function(urlMember) {
      window.open(urlMember, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
    }
  }
});

let datos = loadData(url, header);
datos.then(resultado=>{
  let miembros=resultado.results[0].members;
  return miembros;
}).then(resultado => {
    ordenarMiembrosStatics(resultado);
    return resultado;
  })
  .then(resultado => {
    ordenarMiembrosTop(resultado,"votes_with_party_pct");
    return resultado;
  })
  .catch(error => console.error('Miguel el error es el siguiente: ', error));
