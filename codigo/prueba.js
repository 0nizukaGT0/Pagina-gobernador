const members = data.results[0].members;

function showLink(urlMember) {
  window.open(urlMember, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400");
}
Vue.component('link-url', {
  props: ['miembro'],
  template:` <div>
  <h3>{{miembro.state}}</h3>
  <h2>{{miembro.first_name}}</h2>
  </div>`
});

var lol=new Vue({
  el: '#components-demo',
  data: {
    miembros:members
  }
})
