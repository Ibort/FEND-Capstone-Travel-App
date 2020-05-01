// Personal API Key for OpenWeatherMap API
const api = '&appid=24cf83b2850575c3cb8146c500e11ddf';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
let city = '';
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);
/* Function called by event listener */
function generate(){
  const loc = document.getElementById('loc').value;
  const feeling = document.getElementById('feelings').value;
  const url = baseUrl+loc+api;
  getWeather(url);
}

/* Function to GET Web API Data*/
async function getWeather(url){
  const res = await fetch(url)
  try{
    const data = await res.json();
    console.log(data);
    return data;
  } catch(error) {
    console.log(error);
  }
}
/* Function to POST data */
function postData(url = '', data = {}){
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
