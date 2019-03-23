//ROOT VARIABLES
var path = window.location.pathname;
var page = path.split("/").pop();
let chamber; //house || senate
page==='house-party-loyalty-starter-page.html' ||
page==='house-party-loyalty-starter-page.html' ?
 chamber='house':chamber='senate';
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
  el: '#lest-loyal-members',
  data: {
    members: []
  }
});
var app3 = new Vue({
  el: '#most-loyal-members',
  data: {
    members: []
  }
});
let filtro = ((party, members) => {
  let partyS = members.filter(objeto => objeto.party === party);
  let filtro = {};
  switch (party) {
    case 'D':
      filtro.nameParty = 'Democrat';
      filtro.party = 'D';
      filtro.votesPtc = promedio(partyS);
      break;
    case 'R':
      filtro.nameParty = 'Republican';
      filtro.party = 'R';
      filtro.votesPtc = promedio(partyS) + '%';
      break;
    case 'I':
      filtro.nameParty = 'Independent';
      filtro.party = 'I';
      filtro.votesPtc = promedio(partyS) + '%';
      break;
    default:
  }
  return filtro;
});

function promedio(members) {
  let media = 0;
  for (var i = 0; i < members.length; i++) {
    media += members[i].votes_with_party_pct;
  }
  media === 0 || media == NaN ? media = 0 : media = media / members.length;
  return Math.floor(media);
}

function loadData(url, header) {
  let datos = fetch(url, header)
    .then((result) => result.json())
    .then(miembros => {
      let members = miembros.results[0].members;
      console.log(members);
      return members;
    })
    .catch(error => console.error('Miguel el error es el siguiente: ', error));
  return datos;
}
//Esta funcion debe devolverme un array de objetos con solo los que necesito
function ordenarMiembrosStatics(miembros) {
  //Con el array juego y lo uso para filtrar los 3 partidos
  let partyD = filtro('D', miembros);
  let partyI = filtro('I', miembros);
  let partyR = filtro('R', miembros);
  //Pongo los datos en la variable del Vue
  app.statics.push(partyD, partyR, partyI);
  //Retorno el mismo array sin cambiarlo
  return miembros;
}

function ordenarMiembrosTop(miembros) {
  let leastLoyalMembers = [];
  let mostLoyalMembers = [];
  let miembrosOrdenados;
  page==='house-party-loyalty-starter-page.html' ||
  page==='senate-party-loyalty-starter-page.html' ?
   miembrosOrdenados = miembros.sort(function(a, b) {
    return a.votes_with_party_pct - b.votes_with_party_pct;
  }):
   miembrosOrdenados = miembros.sort(function(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
  });

  for (var i = 0; i < Math.floor((miembros.length * 0.1)); i++) {
    leastLoyalMembers.push(miembrosOrdenados[i]);
    mostLoyalMembers.push(miembrosOrdenados[`${((miembrosOrdenados.length-1)-i)}`]);
  }
  app2.members = leastLoyalMembers;
  app3.members = mostLoyalMembers;
  return miembros;
}
let datos = loadData(url, header);
datos.then(resultado => {
    ordenarMiembrosStatics(resultado);
    return resultado;
  })
  .then(resultado => {
    ordenarMiembrosTop(resultado);
    return resultado;
  })
  .catch(error => console.error('Miguel el error es el siguiente: ', error));
