// Personal API Key for OpenWeatherMap API
const api = '&units=metric&appid=24cf83b2850575c3cb8146c500e11ddf';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
let entId = 1;
const iconFrontUrl = 'http://openweathermap.org/img/wn/';
const iconEndUrl = {
  200: '11d@2x.png', 201: '11d@2x.png', 202: '11d@2x.png', 210: '11d@2x.png', 211: '11d@2x.png', 212: '11d@2x.png', 221: '11d@2x.png', 231: '11d@2x.png', 230: '11d@2x.png', 232: '11d@2x.png',
  300: '09d@2x.png', 301: '09d@2x.png', 302: '09d@2x.png', 310: '09d@2x.png', 311: '09d@2x.png', 312: '09d@2x.png', 313: '09d@2x.png', 314: '09d@2x.png', 321: '09d@2x.png',
  500: '10d@2x.png', 501: '10d@2x.png', 502: '10d@2x.png', 503: '10d@2x.png', 504: '10d@2x.png', 511: '13d@2x.png', 520: '09d@2x.png', 521: '09d@2x.png', 522: '09d@2x.png', 531: '09d@2x.png',
  600: '13d@2x.png', 601: '13d@2x.png', 602: '13d@2x.png', 611: '13d@2x.png', 612: '13d@2x.png', 613: '13d@2x.png', 615: '13d@2x.png', 616: '13d@2x.png', 620: '13d@2x.png', 621: '13d@2x.png', 622: '13d@2x.png',
  701: '50d@2x.png', 711: '50d@2x.png', 721: '50d@2x.png', 731: '50d@2x.png', 741: '50d@2x.png', 751: '50d@2x.png', 761: '50d@2x.png', 762: '50d@2x.png', 771: '50d@2x.png', 781: '50d@2x.png',
  800: '01d@2x.png', 801: '02d@2x.png', 802: '03d@2x.png', 803: '04d@2x.png', 804: '04d@2x.png'
}
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);
/* Function called by event listener */
function generate(e){
  const loc = document.getElementById('loc').value;
  const feeling = document.getElementById('feelings').value;
  const url = baseUrl+loc+api;
  getWeather(url)
  .then(function(data) {
    console.log(data);
    postData('/addResponse', {
              entId: entId,
              city: data.name,
              temp: data.main,
              weather: data.weather,
              feelings: feeling,
              date: new Date().toGMTString()
            })
    entId++;
  })
}

/* Function to GET Web API Data*/
async function getWeather(url){
  const res = await fetch(url)
  try{
    const data = await res.json();
    return data;
  } catch(error) {
    console.log(error);
  }
}
/* Function to POST data */
async function postData(url = '', data = {}){
  const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      } catch(error){
        console.log(error);
      }
}

/* Function to GET Project Data */
async function updateUI(){
  const res = await fetch('all')
  try{
    const allData = await res.json();
    const iconId = allData[0].weather[0].id;

    // Build weather entry
    const icon = await fetch(iconFrontUrl+iconEndUrl[iconId])
    try{
      document.getElementById('weather__icon').innerHTML = `<img src="${icon.url}" alt="Weather icon" width="400px" height="400px">`;
    } catch(error){
      console.log(error);
    }
    console.log(allData);
    document.getElementById('conent__name').innerHTML = allData[0].city;
    document.getElementById('weather__status').innerHTML = allData[0].weather[0].main;
    document.getElementById('weather__morestatus').innerHTML = allData[0].weather[0].description;
    document.getElementById('weather__temp').innerHTML = Math.round(allData[0].temp.temp)+'°C';
    document.getElementById('content__feelings').innerHTML = allData[0].feelings;
    document.getElementById('content__date').innerHTML = allData[0].date;

    // Build journal history
    let history = document.getElementById('history__entries__table');
    let historyEnt = [];
    history.innerHTML = null;
    for (entry of allData){
      historyEnt.push([entry.entId, entry.city, entry.feelings.slice(0, 20)+'...', entry.date]);
    }
    for(i of historyEnt){
      let row = document.createElement('tr');
      for(j of i){
        let cell = document.createElement('td');
        cell.innerHTML = j;
        row.appendChild(cell)
      }
      history.appendChild(row);
    }
  } catch(error){
    console.log(error);
  }
}
