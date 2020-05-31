async function updUi(){
  const cont = document.getElementById('loadCont');
  await fetch('/all')
  .then(res => res.json())
  .then(data => {
    cont.innerHTML = "";
    for (let entry in data) {
      Client.genFrom(data[entry].picURL, data[entry].picTag, data[entry].loc, data[entry].country, data[entry].date, data[entry].daysRem, data[entry].weather.iURL, data[entry].weather.maxTemp, data[entry].weather.minTemp, data[entry].weather.desc);
    }
  })
  .catch(error => console.log('Ui update error:'+error))
}

export { updUi }
