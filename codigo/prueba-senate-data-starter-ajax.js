let congress = '113'; //102-115
let chamber = 'senate'; //house || senate
const url = `https://api.propublica.org/congress/v1/${congress}/${chamber}/members.json`;
const apiKey = 'cf9RM1umZPJ6MoCiiFrwPRDF7NjccEPqPMfiTEfv';
const header = {
  method: 'GET',
  headers: {
    'X-API-Key': apiKey
  }
};
var optionsState = new Vue({
  el: '#select_State',
  data: {
    state: []
  }
});
var app = new Vue({
  el: '#senate-data',
  data: {
    senators: []
  }
});

function filtrarEstate(miembros) {
  let miembrosFiltrados = miembros.filter(x => x.state === document.getElementsByName('state')[0].value);
  return miembrosFiltrados;
}

function filtrarParty(miembros) {
  let miembrosFiltrados = miembros.filter(x => {
    return (x.party === document.getElementsByName('party')[0].value && document.getElementsByName('party')[0].checked) ||
      (x.party === document.getElementsByName('party')[1].value && document.getElementsByName('party')[1].checked) ||
      (x.party === document.getElementsByName('party')[2].value && document.getElementsByName('party')[2].checked)
  });
  /*Esta es la alternativa a usar filter
  for (let i = 0; i < miembros.length; i++) {
    if (miembros[i].party === document.getElementsByName('party')[0].value && document.getElementsByName('party')[0].checked) {
      miembrosFiltrados.push(miembros[i]);
    }
    if (miembros[i].party === document.getElementsByName('party')[1].value && document.getElementsByName('party')[1].checked) {
      miembrosFiltrados.push(miembros[i]);
    }
    if (miembros[i].party === document.getElementsByName('party')[2].value && document.getElementsByName('party')[2].checked) {
      miembrosFiltrados.push(miembros[i]);
    }
  }*/
  return miembrosFiltrados;
}

function aplicarFiltros(miembros) {
  if ((document.querySelectorAll('input[name=party]:checked').length !== 0 || document.getElementsByName('state')[0].value !== "all")) {
    if (document.getElementsByName('state')[0].value !== "all") {
      miembros = filtrarEstate(miembros);
    }
    if (document.querySelectorAll('input[name=party]:checked').length !== 0) {
      miembros = filtrarParty(miembros);
    }
    return miembros;
  } else {
    return miembros;
  }
}

function cargarDatos(array) {
  let miembros = array.results[0].members;
  let miembrosfiltrados = aplicarFiltros(miembros);
  app.senators = miembrosfiltrados;
  return array;
}

function loadData(url, header) {
  let datos = fetch(url, header)
    .then((result) => result.json())
    .catch(error => console.error('Miguel el error es el siguiente: ', error));
  return datos;
}
let datos = loadData(url, header);
datos.then(result => {
  optionsState.state = result.results[0].members;
  return result;
});
datos.then(result => cargarDatos(result));//Llamo por primera vez a la funcion para que cargue la tabla
