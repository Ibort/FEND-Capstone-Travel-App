// adding extra infos to the added trips like packing notes and lodge info
function addInfo(e){
  // creating the input fields
  const lodging = document.getElementById(e.target.id);
  const inputForm = document.createElement('textarea');
  inputForm.addEventListener('input', autoSize);
  const xBtn = document.createElement('span');
  xBtn.innerHTML = 'X';
  xBtn.classList.add('save__Btn')
  const saveBtn = document.createElement('span');
  const textField = document.createDocumentFragment();
  saveBtn.innerHTML = 'S';
  saveBtn.classList.add('save__Btn');
  
  if(e.target.dataset.type === 'add'){
    if(lodging.innerHTML !== lodging.dataset.def){
      inputForm.value = lodging.innerHTML;
      inputForm.style.height = lodging.scrollHeight+200+'px';
    }
    lodging.innerHTML = '';
    lodging.classList.remove('add__form__btn');
    lodging.classList.add('add__from__text');
    textField.appendChild(inputForm);
    textField.appendChild(saveBtn);
    textField.appendChild(xBtn);
    lodging.appendChild(textField);
  }
  if(e.target.innerHTML === 'X'){
    const cancelForm = document.getElementById(e.target.parentElement.id);
    cancelForm.removeEventListener('input', autoSize);
    if(isEmpty(inputForm.value)){
      cancelForm.innerHTML = cancelForm.dataset.def;
      cancelForm.classList.add('add__form__btn');
      cancelForm.classList.remove('add__from__text');
    }
  }
  if(e.target.innerHTML === 'S'){
    const saveData = document.getElementById(e.target.parentElement.id);
    const input = saveData.getElementsByTagName('textarea')[0];
    const tripId = e.target.closest("section > div").getAttribute('data-id')
    const caller = e.target.parentElement.id;
    saveData.removeEventListener('input', autoSize);
    saveData.innerHTML = input.value;
    Client.postD('/addInfo', {
                               tripId: tripId,
                               caller: caller,
                               text: input.value
                             });
    if(isEmpty(input.value)){
      saveData.innerHTML = saveData.dataset.def;
      cancelForm.classList.add('add__form__btn');
      cancelForm.classList.remove('add__from__text');
    }
  }
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

function autoSize(from){
  let input = event.target;
  let height = event.target.scrollHeight;
  input.style.height = height-4+'px';
}

export { addInfo }
