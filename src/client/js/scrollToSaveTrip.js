function scrollToAdd(){
  const posY = document.getElementById('saveTrip').getBoundingClientRect().y
  window.scroll(0, posY);
}

export { scrollToAdd }
