// addtrip button function to sroll down to add a new trip fields
function scrollToAdd(){
  const posY = document.getElementById('saveTrip').getBoundingClientRect().y
  window.scroll(0, posY);
}

export { scrollToAdd }
