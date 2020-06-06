// adding a new trip
function addNewTrip(){
  const inputs = document.getElementById('tTInput');
  const sRes = document.getElementById('sRes');
  const loc = document.getElementById('tripLoc').value;
  const date = new Date(document.getElementById('depDate').value);
  const saveBtn = document.getElementById('saveTrip')
  // check for empty fields, and send the location and date for the server
  if(isEmpty(loc) === false && isNaN(date) === false){
    saveBtn.removeEventListener('click', Client.addNewTrip);
    // send and search for the typed location
    Client.postD('/searchPlace', {
                                  dest: loc,
                                  date: date
                                })
      .then(res => {
        //no location found on typed in name
        if(res.error === 'locError'){
          throw new Error('Location is not valid');
        }
        // if just one location result send automatically
        else if(res.searchRes.length === 1){
          Client.postD('/addResponse', {
                                        dest: res.searchRes[0].id,
                                        date: date
          })
          .then(res => {
            Client.updUi();
          })
          .catch(error => alert(error));
        }
        // if there are more than one result, options to choose from and send back the chosen one
        else{
          const sendChosenLoc = (e) => {
            Client.postD('/addResponse', {
                                          dest: e.target.getAttribute('data-loc'),
                                          date: date
            })
            .then(res => {
              Client.updUi();
            })
            .catch(error => alert(error));
            inputs.removeEventListener('click', sendChosenLoc);
            sRes.innerHTML = '';
          };
          for(let i of res.searchRes){
            sRes.innerHTML += `<div data-loc=${i.id}>${i.place} - ${i.cont}</div>`
          }
          inputs.addEventListener('click', sendChosenLoc)
        }
      })
    .catch(error => alert(error))
    .finally(() => {
      saveBtn.addEventListener('click', Client.addNewTrip);
      document.getElementById('tripLoc').value = '';
      document.getElementById('depDate').value = '';
    })
  }
  else {
    if(isEmpty(loc)){
      alert('Please fill out the location.');
    }
    if(isNaN(date)){
      alert('Please fill out or correct the date format.')
    }
  }

}

// check for empty fields
function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export { addNewTrip }
