function genFrom(imgURL, imgTag, loc, co, depDate, daysLeft, wIconURL, maxTemp, minTemp, wDesc){
  const frag = document.createDocumentFragment();
  const content = document.createElement('div');
  content.classList.add('trip__template');
  const target = document.getElementById('loadCont');
  if(imgURL === 'defTrip'){
    imgURL = Client.defTripImg;
  }
  content.innerHTML =
  `<section class="entry__left">
    <img src=${imgURL} alt=${imgTag}>
    <div id="addLodging" class="add__form__btn" data-type="add" data-def="+add lodging info">+add lodging info</div>
    <div id="addPacking" class="add__form__btn" data-type="add" data-def="+add packing list">+add packing list</div>
    <div id="addNotes" class="add__form__btn" data-type="add" data-def="+add notes">+add notes</div>
  </section>
  <section class="entry__right">
    <div class="dest__time">
      <span>
        <h1>My trip to: ${loc}, ${co}</h1>
        <h1>Departing: ${depDate}</h1>
      </span>
    </div>
    <div class="add__rem__button">
      <span>save trip</span>
      <span>remove trip</span>
    </div>
    <div class="distance">
      <span>${loc}, ${co} is <span>${daysLeft}</span> days away.</span>
    </div>
    <div class="weather">
      <h1>Typical weather for then is:</h1>
      <img src=${wIconURL} alt="weather icon">
      <div class="weather__text">
        <span>High: ${maxTemp}, Low: ${minTemp}</span>
        <span>${wDesc} throught the day.</span>
      </div>
    </div>
  </section>`
  target.appendChild(content);
  document.getElementById('addLodging').addEventListener('click', Client.addInfo);
  document.getElementById('addPacking').addEventListener('click', Client.addInfo);
  document.getElementById('addNotes').addEventListener('click', Client.addInfo);
}


export { genFrom }
