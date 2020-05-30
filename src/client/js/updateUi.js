async function updUi(){
  const cont = document.getElementById('loadCont');
  await fetch('/all')
  .then(res => res.json())
  .then(data => {
    cont.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      Client.genFrom(data[i].picURL, data[i].picTag, data[i].loc, data[i].country, data[i].date, data[i].daysRem, data[i].weather.iURL, data[i].weather.maxTemp, data[i].weather.minTemp, data[i].weather.desc);
    }
  })
  .catch(error => console.log('Ui update error:'+error))
}

export { updUi }
