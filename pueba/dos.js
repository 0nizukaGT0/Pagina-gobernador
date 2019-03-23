import axios from "axios"
const url = "https://api.propublica.org/congress/v1/113/senate/members.json";
const apiKey = "MjftNKbr3tuIihAmLUinxUqMTG98lJH26kAoR1DM";
const header = {
  headers: {
    "X-API-Key": apiKey
  }
};
//aqui no se que hacer ya que todo me cuensta un huevo
// axios.get(url, {headers: config})
let lo=axios.get(url,header)
.then(res=>{
	console.log(res);
	return res
})
.catch(error=>console.log('Houston tenemoss un problema'));
lo.then (r=>{console.table(r.data.results[0].members)})
