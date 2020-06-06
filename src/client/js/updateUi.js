// loading the saved data into the index.html
async function updUi(){
  const cont = document.getElementById('loadCont');
  let daysLeft = [];
  await fetch('http://localhost:8080/all')
  .then(res => res.json())
  .then(data => {
    cont.innerHTML = "";
    // sort the received data ascend 'days left' order
    // loading the days left and id-s into an array
    for (let entry in data) {
      daysLeft.push({dayLeft: data[entry].daysRem, tripId: data[entry].id})
    }
    // sort the array into ascend
    daysLeft.sort(compare);
    // load the data to the website
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

  if(dayA==0 && dayB!=0) return 1;
  else if(dayB==0 && dayA!=0) return -1;
  else if (dayA > dayB) return 1;
  else if (dayB > dayA) return -1;
}

export { updUi }
