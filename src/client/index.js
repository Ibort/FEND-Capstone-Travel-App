// import { addForm } from './js/addTextFrom'
import { addNewTrip } from './js/addTrip';
import { genFrom } from './js/generateFrom';
import { postD } from './js/postData';
import { updUi } from './js/updateUi.js';

import './styles/styles.scss';


document.getElementById('saveTrip').addEventListener('click', addNewTrip);
updUi();
// document.getElementById('addLodging').addEventListener('click', addForm);
// document.getElementById('addPacking').addEventListener('click', addForm);
// document.getElementById('addNotes').addEventListener('click', addForm);
// document.getElementById('history__entries__table').addEventListener('click', loadEntry)

export {
  postD,
  updUi,
  genFrom
}
