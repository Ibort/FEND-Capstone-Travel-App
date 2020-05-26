function addForm(e){
  const lodging = document.getElementById(e.target.id);
  const inputForm = document.createElement('input');
  inputForm.type = 'text';
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
    if(isEmpty(inputForm.value)){
      cancelForm.innerHTML = cancelForm.dataset.def;
      cancelForm.classList.add('add__form__btn');
      cancelForm.classList.remove('add__from__text');
    }
  }
  if(e.target.innerHTML === 'S'){
    const saveData = document.getElementById(e.target.parentElement.id);
    const input = saveData.getElementsByTagName('input')[0];
    if(isEmpty(input.value) === false){
      saveData.innerHTML = input.value;
    }
    else {
      alert('Please fill it out or cancel');
    }

  }
}

function isEmpty(str){
    return str === null || str.match(/^ *$/) !== null;
}

export { addForm }
