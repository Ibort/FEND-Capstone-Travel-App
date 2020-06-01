function addNewTrip(){
  const loc = document.getElementById('tripLoc').value;
  const date = new Date(document.getElementById('depDate').value);
  const saveBtn = document.getElementById('saveTrip')
  if(isEmpty(loc) === false && isNaN(date) === false){
    saveBtn.removeEventListener('click', Client.addNewTrip);
    Client.postD('/addResponse', {
                                  dest: loc,
                                  date: date
                                })
      .then(res => {
        if(res.error === 'locError'){
          throw new Error('Location is not valid');
        }
        else{
          Client.updUi();
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

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export { addNewTrip }
