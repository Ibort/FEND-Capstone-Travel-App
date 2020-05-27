// Setup empty JS object to act as endpoint for all routes
let projectData = [];
let entId = 1;

const dotenv = require('dotenv').config();
const fetch = require('node-fetch');
// Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'));

const port = 8080;
// Spin up the server
const server = app.listen(port, listening)
// Callback to debug
function listening(){
     console.log("server running");
     console.log(`running on localhost: ${port}`);
}
// Initialize all route with a callback function
app.get('/all', getData);
// Callback function to complete GET '/all'
function getData(req, res){
  res.send(projectData);
}
// Post Route
app.post('/addResponse', addResponse);

async function addResponse(req, res){
  await fetch(process.env.GEO_API_URL+encodeURIComponent(req.body.dest)+process.env.GEO_API_ID)
  .then(res => res.json())
  .then(geo => {
    if(geo.totalResultsCount === 0){
      res.send({error:'locError'})
    }
    else{
      const lng = '&lon='+geo.geonames[0].lng;
      const lat = '&lat='+geo.geonames[0].lat;
      const date = new Date(req.body.date);
      const sDate = `&start_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      const eDate = `&end_date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()+1}`
      const geoData = {long: lng,
                       lati: lat,
                       startDate: sDate,
                       endDate: eDate
                      }
      return geoData;
    }
  })
  .then(async geoData => {
    await fetch(process.env.WHE_API_URL+geoData.lati+geoData.long+geoData.startDate+geoData.endDate+process.env.WHE_API_ID)
    .then(res => res.json())
    .then(weather => console.log(weather))
  })
  .catch(error => console.log(error));
  // newEntry = {
  //   entId: entId,
  //   destination: req.body.dest,
  //   date: req.body.date
  // }
  // projectData.push(newEntry);
  // res.send(projectData);
  // entId++;
}

async function weatherbitAPI(lati, lang, startDate, endDate){
  const response = await fetch(process.env.WHE_API_URL+lati+lang+startDate+endDate+process.env.WHE_API_ID)
  .catch(error => console.log('weathererror'+error))
  return response.json();
}

app.get('/test', function (req, res) {
    res.send('mockAPIResponse');
})
