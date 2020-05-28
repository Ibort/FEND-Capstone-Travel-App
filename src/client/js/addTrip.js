function addNewTrip(){
  const loc = document.getElementById('tripLoc').value;
  const date = new Date(document.getElementById('depDate').value);
  if(isEmpty(loc) === false && isNaN(date) === false){
    postData('/addResponse', {
                                dest: loc,
                                date: date
                              })
    .then(res => console.log(res))
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

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export { addNewTrip }
