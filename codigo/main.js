//-----VARIABLES------------
let contenido = '';
let members;
//-----------------CODIGO OPCIONAL PARA ESCRIBIR LAS OPCIONES//
let opcionesState = '<option  selected value="all" >all</option>';
for (let i = 0; i < data.results[0].members.length; i++) {
  opcionesState += `<option value="${data.results[0].members[i].state}">${data.results[0].members[i].state}</option>`;
}
document.getElementById("sel1").innerHTML = opcionesState; //esta variable guardara el valor false mientras ninguna opcion sea elegida
//----------------
//--------------FUNCIONES-----------------//
function inicioTabla() {
  contenido = '<table class="table table-active table-hover table-borderless table-striped">';
  contenido += '<th class="table-info">officialName</th>';
  contenido += '<th class="table-info">Party</th>';
  contenido += '<th class="table-info">state</th>';
  contenido += '<th class="table-info">Seniority</th>';
  contenido += '<th class="table-info">Porcentages</th>';
}//OPCIONAL
function finTabla(members) {
  for (let i = 0; i < members.length; i++) {
    contenido += '<tr>';
    contenido += `<td>
    <a href="${members[i].url}">
    ${members[i].last_name} ${members[i].middle_name || '  '} ${members[i].first_name}
    </a></td> `;
    contenido += `<td> ${members[i].party}</td>`;
    contenido += `<td> ${members[i].state}</td>`;
    contenido += `<td> ${members[i].seniority}</td>`;
    contenido += `<td> ${members[i].votes_with_party_pct}</td>`;
    contenido += '</tr>';
  }
  console.log(members);
  contenido += '</table>';
}
//FUNCION QUE DETERMINA SI EXISTE ALGUN FILTRO OSEA PUEDEN EXISTIR VARIOS
function isSomeFilterActive() {
  if (document.querySelectorAll('input[name=party]:checked').length !== 0 || document.getElementsByName('state')[0].value !== "all") {
    return true;
  } else {
    return false;
  }
}

function filtrarEstate(miembros) {
  let miembrosFiltrados = [];
  for (let i = 0; i < miembros.length; i++) {
    if (miembros[i].state === document.getElementsByName('state')[0].value) {
      miembrosFiltrados.push(miembros[i]);
    }
  }
  console.log(miembrosFiltrados);
  return miembrosFiltrados;
}

function filtrarParty(miembros) {
  let miembrosFiltrados = [];
  //este filtro de bera fitrar los resultdos en realcion a los 3 checkboxes ,
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
  }
  return miembrosFiltrados;
}

function createTable() {
  members = data.results[0].members;
  let filtrosActivos = isSomeFilterActive();
  if (filtrosActivos) {
    if (document.getElementsByName('state')[0].value !== "all") {
      members = filtrarEstate(members);
    }
    if (document.querySelectorAll('input[name=party]:checked').length !== 0) {
      members = filtrarParty(members);
    }
    inicioTabla();
    finTabla(members);
  } else {
    inicioTabla();
    finTabla(members);
  }
  document.getElementById("senate-data").innerHTML = contenido;
}
//Llamo a la funcion una vez para que se pinte la tabla
