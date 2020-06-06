// adding extra infos to the added trips like packing notes and lodge info
function addInfo(e){
  // creating the input fields
  const infoCont = document.getElementById(e.target.id);
  const inputForm = document.createElement('textarea');
  inputForm.addEventListener('input', autoSize);
  // create cancel button
  const xBtn = document.createElement('span');
  xBtn.innerHTML = 'X';
  xBtn.classList.add('save__Btn')
  xBtn.addEventListener('click', updateInfo);
  // create save button
  const saveBtn = document.createElement('span');
  const textField = document.createDocumentFragment();
  saveBtn.innerHTML = 'S';
  saveBtn.classList.add('save__Btn');
  saveBtn.addEventListener('click', updateInfo);
  // check if default data is changed and load the typed in data
  if(infoCont.innerHTML !== infoCont.dataset.def){
    inputForm.value = infoCont.innerHTML;
    inputForm.style.height = infoCont.scrollHeight+200+'px';
  }

  infoCont.innerHTML = '';
  infoCont.classList.remove('add__form__btn');
  infoCont.classList.add('add__from__text');
  textField.appendChild(inputForm);
  textField.appendChild(saveBtn);
  textField.appendChild(xBtn);
  infoCont.appendChild(textField);

  e.target.removeEventListener('click', addInfo);
}


// update info function for the save and clear buttons
function updateInfo(e){
  const updateData = document.getElementById(e.target.parentElement.id);
  const input = updateData.getElementsByTagName('textarea')[0];
  let inputVal = '';
  const tripId = e.target.closest("section > div").getAttribute('data-id')
  const caller = e.target.parentElement.id;

  if(e.target.innerHTML === 'X'){
    updateData.innerHTML = updateData.dataset.def;
    inputVal = updateData.dataset.def;
    updateData.classList.add('add__form__btn');
    updateData.classList.remove('add__from__text');
  }
  if(e.target.innerHTML === 'S'){
    updateData.innerHTML = input.value;
    inputVal = input.value;
    updateData.classList.remove('add__form__btn');
    updateData.classList.add('add__from__text');
  }
  updateData.removeEventListener('input', autoSize);
  Client.postD('/addInfo', {
                             tripId: tripId,
                             caller: caller,
                             text: inputVal
                           });
  e.target.removeEventListener('click', updateInfo);
  setTimeout(() => updateData.addEventListener('click', addInfo), 100)
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}
// auto resize thext input fileds
function autoSize(from){
  let input = event.target;
  let height = event.target.scrollHeight;
  input.style.height = height-4+'px';
}

export { addInfo }
