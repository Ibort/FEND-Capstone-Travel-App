// Personal API Key for OpenWeatherMap API
const api = '&units=metric&appid=24cf83b2850575c3cb8146c500e11ddf';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
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
document.getElementById('history__entries__table').addEventListener('click', loadEntry)
/* Function called by event listener generate*/
function generate(e){
  const loc = document.getElementById('loc');
  const feeling = document.getElementById('feelings');
  const url = baseUrl+loc.value+api;
  getWeather(url)
  .then(function(data) {
    if(data.cod === 200){
      postData('/addResponse', {
                city: data.name,
                temp: data.main,
                weather: data.weather,
                feelings: feeling.value,
                date: new Date().toGMTString()
              })
      loc.value = null;
      feeling.value = null;
      updateUI();
    }
    else{
      loc.classList.add('weather__zip-error');
      setTimeout(()=> loc.classList.remove('weather__zip-error'), 300);
    }
  })
}

// Load history function
function loadEntry(e){
  let target = e.target.closest('tr').firstChild.innerText;
  updateUI(target-1);
}

/* Function to GET Web API Data*/
async function getWeather(url){
  const res = await fetch(url)
  try{
    const data = await res.json();
    return data;
  } catch(error) {
    console.log('Get weather Error:'+error);
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
        return newData;
      } catch(error){
        console.log('Post data error:'+error);
      }
}

/* Function to GET Project Data */
async function updateUI(entryNum){
  const res = await fetch('all')
  try{
    const allData = await res.json();
    if(entryNum == null){
      entryNum = allData.length-1;
    }
    const iconId = allData[entryNum].weather[0].id;

    // Build weather entry
    const icon = await fetch(iconFrontUrl+iconEndUrl[iconId])
    .then(icon => {
      if(icon.ok){
        document.getElementById('weather__icon').innerHTML = `<img src="${icon.url}" alt="Weather icon" width="400px" height="400px">`;
      }
      else {
        document.getElementById('weather__icon').innerHTML = `<img src="/assets/def_weather.png" alt="Weather icon" width="400px" height="400px">`;
      }
    })
    .catch(error => console.log('Icon error'+error));

    document.getElementById('conent__name').innerHTML = allData[entryNum].city;
    document.getElementById('weather__status').innerHTML = allData[entryNum].weather[0].main;
    document.getElementById('weather__morestatus').innerHTML = allData[entryNum].weather[0].description;
    document.getElementById('weather__temp').innerHTML = Math.round(allData[entryNum].temp.temp)+'°C';
    document.getElementById('content__feelings').innerHTML = allData[entryNum].feelings;
    document.getElementById('content__date').innerHTML = allData[entryNum].date;

    // Build journal history
    let history = document.getElementById('history__entries__table');
    let historyEnt = [];
    const historyItems = document.createDocumentFragment();
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
      historyItems.appendChild(row);
    }
    history.appendChild(historyItems);
    history.children[entryNum].style.background = '#30475e';
  } catch(error){
    console.log('Update ui error:'+error);
    if(error instanceof TypeError){
      alert('Please generate the first entry')
    }
  }
}

updateUI();
