// loading the saved data into the index.html
async function updUi(){
  const cont = document.getElementById('loadCont');
  let daysLeft = [];
  await fetch('http://localhost:8080/all')
  .then(res => res.json())
  .then(data => {
    cont.innerHTML = "";
    for (let entry in data) {
      daysLeft.push({dayLeft: data[entry].daysRem, tripId: data[entry].id})
    }
    daysLeft.sort(compare)
    for (let entry of daysLeft){
      Client.genFrom(data[entry.tripId].id, data[entry.tripId].lodg, data[entry.tripId].pack,
                     data[entry.tripId].note, data[entry.tripId].picURL, data[entry.tripId].picTag,
                     data[entry.tripId].loc, data[entry.tripId].country, data[entry.tripId].date,
                     data[entry.tripId].daysRem, data[entry.tripId].weather.iURL,
                     data[entry.tripId].weather.maxTemp, data[entry.tripId].weather.minTemp,
                     data[entry.tripId].weather.desc);
    }
  })
  .catch(error => console.log('Ui update error:'+error))
}

function compare(a, b) {
  const dayA = a.dayLeft;
  const dayB = b.dayLeft;

  if (dayA > dayB) return 1;
  if (dayB > dayA) return -1;
}

export { updUi }
