function addNewTrip(){
  const loc = document.getElementById('tripLoc');
  const date = document.getElementById('depDate');
  if(isEmpty(loc.value) === false && isEmpty(date.value) === false){
    postData('/addResponse', {
                                dest: loc.value,
                                date: date.value
                              });
  }
  else {
    alert('Please fill out both location and date field')
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
