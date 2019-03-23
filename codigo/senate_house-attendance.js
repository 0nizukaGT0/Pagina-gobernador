function filtrarParty(party, members) {
  let filtro = [];
  for (var i = 0; i < members.length; i++) {
    if (members[i].party === party) {
      filtro.push(members[i]);
    }
  }
  return filtro;
}

function promedio(members) {
  let media = 0;
  for (var i = 0; i < members.length; i++) {
    media += members[i].votes_with_party_pct;
  }
  media = media / members.length;
  return Math.floor(media);
}

function drawTable(members) {
  tabla = '<table class=" table  table-striped">';
  tabla += '<th class="table-success">Nombre</th><th class="table-success">No. Missed Votes</th><th class="table-success">% Missed</th>'
  for (var i = 0; i < members.length; i++) {
    tabla += '<tr>';
    tabla += `<td>
    <a href="${members[i].url}">
    ${members[i].first_name} ${members[i].middle_name || '  '} ${members[i].last_name}
    </a></td> `;
    tabla += `<td style="text-align:center">  ${members[i].missed_votes}</td>`;
    tabla += `<td style="text-align:center"> ${members[i].missed_votes_pct}%</td>`;

    tabla += '</tr>';
  }
  tabla += '</table>';
  return tabla;
}

let members = data.results[0].members;
let membersDemocrat = filtrarParty('D', members);
let membersIndependent = filtrarParty('I', members);
let membersRepublican = filtrarParty('R', members);
let tenPorcent = members => ((10 * members.length) / 100) + 0.5; //Esto da un numero con decimales pero es el 10%
let statics = [];
let miembrosordenados = members;
statics.push({
  'party': 'Democratas',
  'number_members': membersDemocrat.length,
  'votes_party_porcentage': promedio(membersDemocrat)
});
statics.push({
  'party': 'Independent',
  'number_members': membersIndependent.length,
  'votes_party_porcentage': promedio(membersIndependent)
});
statics.push({
  'party': 'Republican',
  'number_members': membersRepublican.length,
  'votes_party_porcentage': promedio(membersRepublican)
});
let contenidoTablaStatics = (members) => {
  let tabla = '';
  tabla += '<table class=" table  table-striped">';
  tabla += '<th class="table-warning">Partido</th> <th class="table-warning">Numero de miembros</th> <th class="table-warning">%votes</th>'
  for (var i = 0; i < members.length; i++) {
    tabla += '<tr>';
    tabla += `<td style="text-align:center">${members[i].party   || '0'}
    </td> `;
    tabla += `<td style="text-align:center">${members[i].number_members   || '0'} </td>`;
    tabla += `<td style="text-align:center">${members[i].votes_party_porcentage   || '0'}%
    </td> `;
    tabla += '</tr>';
  }
  tabla += '</table>'
  return tabla;
};
//ordeno los miembros deacuerdo al criterio que me digan !hacer de eso una funcion que reciba un parametro ?
miembrosordenados.sort(function(a, b) {
  return a.missed_votes_pct - b.missed_votes_pct;
});
/*
function sortByConcept (array,concept){
  array.sort(function(a, b) {
    return a.concept - b.concept;
  });
}*/ //Funcion para ordenar pero sin funcionar
//Now lets load the first and last 10
let lestLoyalMembers = [];
let mostLoyalMembers = [];
for (var i = 0; i < Math.floor(tenPorcent(members)); i++) {
  mostLoyalMembers.push(miembrosordenados[i]);
  lestLoyalMembers.push(miembrosordenados[`${((miembrosordenados.length-1)-i)}`]);
}
//Now that we have everything we need we need to put everything to send , the dates are statics now so we don´t need to worry for the size
let contenidoTablaLestLoyal = drawTable(lestLoyalMembers);
let contenidoTablaMostLoyal = drawTable(mostLoyalMembers);

document.getElementById("lest-loyal-members").innerHTML = contenidoTablaLestLoyal;
document.getElementById('most-loyal-members').innerHTML = contenidoTablaMostLoyal;
document.getElementById('statics').innerHTML = contenidoTablaStatics(statics);
