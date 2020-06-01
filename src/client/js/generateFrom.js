function genFrom(id, addL, addP, addN, imgURL, imgTag, loc, co, depDate, daysLeft, wIconURL, maxTemp, minTemp, wDesc){
  const frag = document.createDocumentFragment();
  const content = document.createElement('div');
  content.classList.add('trip__template');
  content.setAttribute('data-id', `${id}`)
  const target = document.getElementById('loadCont');
  if(imgURL === 'defTrip'){
    imgURL = Client.defTripImg;
  }
  content.innerHTML =
  `<div class="entry__left">
    <img src=${imgURL} alt=${imgTag}>
    <div id="addLodging${id}" class="add__form__btn" data-type="add" data-def="+add lodging info">${addL}</div>
    <div id="addPacking${id}" class="add__form__btn" data-type="add" data-def="+add packing list">${addP}</div>
    <div id="addNotes${id}" class="add__form__btn" data-type="add" data-def="+add notes">${addN}</div>
  </div>
  <div class="entry__right">
    <div class="dest__time">
      <span>
        <h1>My trip to: ${loc}, ${co}</h1>
        <h1>Departing: ${depDate}</h1>
      </span>
    </div>
    <div class="add__rem__button">
      <span>save trip</span>
      <span id="remTrip${id}">remove trip</span>
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
  </div>`
  target.appendChild(content);
  document.getElementById(`addLodging${id}`).addEventListener('click', Client.addInfo);
  document.getElementById(`addPacking${id}`).addEventListener('click', Client.addInfo);
  document.getElementById(`addNotes${id}`).addEventListener('click', Client.addInfo);
  document.getElementById(`remTrip${id}`).addEventListener('click', Client.delTrip)
  if(addL !== '+add lodging info'){
    const lodF = document.getElementById(`addLodging${id}`);
    lodF.classList.remove('add__form__btn');
    lodF.classList.add('add__from__text');
  }
  if(addP !== '+add packing list'){
    const packF = document.getElementById(`addPacking${id}`);
    packF.classList.remove('add__form__btn');
    packF.classList.add('add__from__text');
  }
  if(addN !== '+add notes'){
    const notF = document.getElementById(`addNotes${id}`);
    notF.classList.remove('add__form__btn');
    notF.classList.add('add__from__text');
  }
}

export { genFrom }
