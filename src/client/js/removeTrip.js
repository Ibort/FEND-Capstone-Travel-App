// delete the selected trip from the server.
function delTrip(event){
  let id = '';
  const text = event.target.parentElement.parentElement.querySelector('.dest__time').innerText;
  if(window.confirm(`Are you want to delete this trip:${text}`)){
      if(event.target.innerText === 'remove trip'){
        id = event.target.parentElement.parentElement.parentElement.getAttribute('data-id');
      }
      else{
        id = event.target.parentElement.getAttribute('data-id');
      }
      Client.postD('/delT', {
        id: id
      })
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
