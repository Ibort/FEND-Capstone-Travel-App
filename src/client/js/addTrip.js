function addNewTrip(){
  const loc = document.getElementById('tripLoc').value;
  const date = new Date(document.getElementById('depDate').value);
  if(isEmpty(loc) === false && isNaN(date) === false){
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
    .catch(error => alert(error));
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
