// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let entId = 1;
const geoURL = 'http://api.geonames.org/';

//country codes and names from http://country.io/
const countryCodes = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}

// weatherabit icon codes nad url
const weatherIconURL = 'https://www.weatherbit.io/static/img/icons/';
const weatherCode = {
  200: {url: 't01d', desc: 'Thunderstorm with light rain'}, 201: {url: 't02d', desc: 'Thunderstorm with rain'}, 202: {url: 't03d', desc: 'Thunderstorm with heavy rain'}, 230: {url: 't04d', desc: 'Thunderstorm with light drizzle'}, 231: {url: 't04d', desc: 'Thunderstorm with drizzle'}, 232: {url: 't04d', desc: 'Thunderstorm with heavy drizzle'}, 233: {url: 't05d', desc: 'Thunderstorm with Hail'}, 300: {url: 'd01d', desc: 'Light Drizzle'}, 301: {url: 'd02d', desc: 'Drizzle'},
  302: {url: 'd03d', desc: 'Heavy Drizzle'}, 500: {url: 'r01d', desc: 'Light Rain'}, 501: {url: 'r02d', desc: 'Moderate Rain'}, 502: {url: 'r03d', desc: 'Heavy Rain'}, 511: {url: 'f01d', desc: 'Freezing rain'}, 520: {url: 'r04d', desc: 'Light shower rain'}, 521: {url: 'r05d', desc: 'Shower rain'}, 522: {url: 'r06d', desc: 'Heavy shower rain'}, 600: {url: 's01d', desc: 'Light snow'}, 601: {url: 's02d', desc: 'Snow'}, 602: {url: 's03d', desc: 'Heavy Snow'},
  610: {url: 's04d', desc: 'Mix snow/rain'}, 611: {url: 's05d', desc: 'Sleet'}, 612: {url: 's05d', desc: 'Heavy sleet'}, 621: {url: 's01d', desc: 'Snow shower'}, 622: {url: 's02d', desc: 'Heavy snow shower'}, 623: {url: 's06d', desc: 'Flurries'}, 700: {url: 'a01d', desc: 'Mist'}, 711: {url: 'a02d', desc: 'Smoke'}, 721: {url: 'a03d', desc: 'Haze'}, 731: {url: 'a04d', desc: 'Sand/dust'}, 741: {url: 'a05d', desc: 'Fog'}, 751: {url: 'a06d', desc: 'Freezing Fog'},
  800: {url: 'c01d', desc: 'Clear sky'}, 801: {url: 'c02d', desc: 'Few clouds'}, 802: {url: 'c02d', desc: 'Scattered clouds'}, 803: {url: 'c03d', desc: 'Broken clouds'}, 804: {url: 'c04d', desc: 'Overcast clouds'}, 900: {url: 'u00d', desc: 'Unknown Precipitation'}
}

const mockAPIResponse = require('./mockAPI.js');
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
  // update days left data
  if(Object.entries(projectData).length > 0){
    for(let data in projectData){
      projectData[data].daysRem = remainingDays(projectData[data].calcDate);
    }
  }
  res.send(projectData);
}

// delete secelted trip
app.post('/delT', delT);

function delT(req, res){
  const id = req.body.id;
  delete projectData[id];
  res.send({status:'deleted'});
}

// Post extra info
app.post('/addInfo', addInfo);

// ceck for the currect id and save the recived variable to it
function addInfo(req, res){
  const id = req.body.tripId;
  if(req.body.caller === `addLodging${id}`){
    projectData[id].lodg = req.body.text;
  }
  else if(req.body.caller === `addPacking${id}`){
    projectData[id].pack = req.body.text;
  }
  else if(req.body.caller === `addNotes${id}`){
    projectData[id].note = req.body.text;
  }
}
// Post Route
app.post('/addResponse', addResponse);
app.post('/searchPlace', searchPlace);

// search for given location function
async function searchPlace(req, res){
  // call geonames api with max 5 results
  await fetch(geoURL+'searchJSON?name_equals='+encodeURIComponent(req.body.dest)+'&maxRows=5'+process.env.GEO_API_ID)
  .then(res => res.json())
  .then(geo => {
    if(geo.totalResultsCount === 0){
      res.send({error:'locError'});
      throw new Error('Location is not valid');
    }
    else{
      let find = [];
      for(let ent of geo.geonames){
        find.push({id: ent.geonameId ,place: ent.name, cont: ent.countryCode})
      }
      res.send({searchRes: find});
    }
  })
  .catch(error => console.log('searchPlace error'+error));
}
// add new entry to server projectData variable
async function addResponse(req, res){
  const newEntry = {id: entId,
                    loc: 'NaN',
                    country: 'NaN',
                    date: 'NaN',
                    calcDate: Date.now(),
                    daysRem: 'NaN',
                    weather: {
                      minTemp: 'NaN',
                      maxTemp: 'NaN',
                      iURL: '900',
                      desc: 'NaN'
                    },
                    lodg: '+add lodging info',
                    pack: '+add packing list',
                    note: '+add notes',
                    picURL: 'NaN',
                    picTag: 'default trip location image'
                   };

  // call geonames api and save latitude longitude city and counrty
  await fetch(geoURL+'getJSON?geonameId='+req.body.dest+process.env.GEO_API_ID)
  .then(res => res.json())
  .then(geo => {
    //save the date calculate the remaining Days. Send the lat, long, start date, end date, theese are nessesery for the weatherbit api
    const lng = '&lon='+geo.lng;
    const lat = '&lat='+geo.lat;
    const date = new Date(req.body.date);
    newEntry.calcDate = date;
    newEntry.date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
    newEntry.daysRem = remainingDays(date);
    newEntry.loc = geo.name;
    const sDate = `&start_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()}`
    const eDate = `&end_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()+1}`
    const geoData = {long: lng,
                     lati: lat,
                     startDate: sDate,
                     endDate: eDate
                    }
    return geoData;
  })
  // after sucessfully answer of lan and lon call wheatherabit api
  .then(async geoData => {
    const wheaURL = 'https://api.weatherbit.io/v2.0/history/hourly?';
    await fetch(wheaURL+geoData.lati+geoData.long+geoData.startDate+geoData.endDate+process.env.WHE_API_ID)
    .then(res => res.json())
    // get from hourlyData the min,max temp and common weather icon url
    .then(weather => {
      const hourlyData = weather.data;
      // load the horly data temperatures and icon codes into arrays
      const getWeathData = () => {
        let tempArr = [];
        let iconArr = [];
        for(let index of hourlyData){
          tempArr.push(index.temp);
          iconArr.push(index.weather.code)
        }
        return [tempArr, iconArr];
      }
      // get the lowest highest temp and most common weather icon code
      const temp = getWeathData();
      const lowTemp = Math.min(...temp[0]);
      const highTemp = Math.max(...temp[0]);
      const avWeath = mostCommon(temp[1]);
      // save to projectdata variable
      newEntry.country = countryCodes[weather.country_code];
      newEntry.weather.minTemp = lowTemp+'C°';
      newEntry.weather.maxTemp = highTemp+'C°';
      newEntry.weather.iURL = `"${weatherIconURL}${weatherCode[avWeath].url}.png"`;
      newEntry.weather.desc = weatherCode[avWeath].desc;
    })
    .catch(error => {
      throw error;
    });
  })
  // calling pixabay api to get a picture for our trip
  .then(async () => {
    // search for (loc + country + building cat) pictures
    const searchPic = '&q='+encodeURIComponent(newEntry.loc)+'+'+newEntry.country+'&category=travel';
    const searchCountryPic = '&q='+newEntry.country;
    const pixUrl = 'https://pixabay.com/api/?key=';
    await fetch(pixUrl+process.env.PIX_API_ID+searchPic)
    .then(res => res.json())
    // if there is no result save the defualt picture
    .then(async pic => {
      if(pic.total === 0){
        await fetch(process.env.PIX_API_URL+process.env.PIX_API_ID+searchCountryPic)
        .then(res => res.json())
        .then(pic2 => {
            if(pic2.total === 0){
              newEntry.picURL = 'defTrip';
            }
            else {
              newEntry.picURL = pic2.hits[0].webformatURL;
              newEntry.picTag = pic2.hits[0].tags;
            }
        })
      }
      // save the first result url to projectdata
      else {
        newEntry.picURL = pic.hits[0].webformatURL;
        newEntry.picTag = pic.hits[0].tags;
      }
    })
    .catch(error => {
      console.log('pic error:'+error);
      newEntry.picURL = 'default.jpg';
    })
  })
  //add the data collection to our projectData variable
  .then(() => {
    projectData[entId] = newEntry
    res.send(projectData);
    entId++;
  })
  .catch(error => console.log('Addresponse api error:'+error));
}

// test function
app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
})

// calculate day left from todays date minus trip date
function remainingDays(eDate){
  const oneDay = 24 * 60 * 60 * 1000;
  const today = Date.now();
  const days = Math.floor((today - eDate) / oneDay);
  if(days > 0) {
    return 0;
  }
  else{
    return Math.abs(days);
  }
}

// get the most common element in an array
function mostCommon(array){
  const arr1 = array;
  let mf = 1;
  let m = 0;
  let item;
  for (let i=0; i<arr1.length; i++){
          for (let j=i; j<arr1.length; j++){
                  if (arr1[i] == arr1[j])
                   m++;
                  if (mf<m){
                    mf=m;
                    item = arr1[i];
                  }
          }
          m=0;
  }
  return item;
}
