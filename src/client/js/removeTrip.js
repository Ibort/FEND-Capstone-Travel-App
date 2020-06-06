// delete the selected trip from the server.
function delTrip(event){
  let id = '';
  const text = event.target.parentElement.parentElement.querySelector('.dest__time').innerText;
  if(window.confirm(`Are you want to delete this trip:${text}`)){
      // if the trip is not expired
      if(event.target.innerText === 'remove trip'){
        id = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');
      }
      // the trip is expired
      else{
        id = event.target.parentElement.getAttribute('data-id');
      }
      // delete it from the server
      Client.postD('/delT', {
        id: id
      })
      // refresh page
      .then(res => {
        if(res.status === 'deleted'){
          Client.updUi()
        }
        else{
          alert('There was a problem with the deleting');
        }
      })
      .catch(error => console.log('delte error:'+console.error()));

  }
}

export {delTrip}
