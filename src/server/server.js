// Setup empty JS object to act as endpoint for all routes
let projectData = [];
let entId = 1;

//from http://country.io/
const countryCodes = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}

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
  const newEntry = {id: entId,
                    loc: 'NaN',
                    country: 'NaN',
                    date: 'NaN',
                    daysRem: 'NaN',
                    minTemp: 'NaN',
                    maxTemp: 'NaN',
                    lodg: '',
                    pack: '',
                    note: '',
                    picURL: 'NaN'
                   };

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
      newEntry.date = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
      newEntry.daysRem = remainingDays(date);
      const sDate = `&start_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()}`
      const eDate = `&end_date=${date.getFullYear()-1}-${date.getMonth()+1}-${date.getDate()+1}`
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
    .then(weather => {
      newEntry.loc = weather.city_name;
      newEntry.country = countryCodes[weather.country_code];
      newEntry.minTemp = weather.data[0].min_temp+'C°';
      newEntry.maxTemp = weather.data[0].max_temp+'C°';
    })
    .catch(error => console.log('Weatherabit error:'+error));
  })
  .then(async () => {
    const searchPic = '&q='+encodeURIComponent(newEntry.loc)+'&category=buildings';
    await fetch(process.env.PIX_API_URL+process.env.PIX_API_ID+searchPic)
    .then(res => res.json())
    .then(pic => {
      if(pic.total === 0){
        newEntry.picURL = 'default.jpg';
      }
      else {
        newEntry.picURL = pic.hits[0].webformatURL;
      }
    })
    .catch(error => {
      console.log('pic error:'+error);
      newEntry.picURL = 'default.jpg';
    })
  })
  .catch(error => console.log('Addresponse api error:'+error))
  .finally(() => {
    entId++;
    res.send(newEntry);
  });
  // newEntry = {
  //   entId: entId,
  //   destination: req.body.dest,
  //   date: req.body.date
  // }
  // projectData.push(newEntry);
  // res.send(projectData);
}

function remainingDays(eDate){
  const oneDay = 24 * 60 * 60 * 1000;
  const today = Date.now();
  const days = Math.round((today - eDate) / oneDay);
  if(days >= 0) {
    return 0;
  }
  else{
    return Math.abs(days);
  }
}

app.get('/test', function (req, res) {
    res.send('mockAPIResponse');
})
