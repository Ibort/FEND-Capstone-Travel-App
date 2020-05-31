// import { addForm } from './js/addTextFrom'
import { addNewTrip } from './js/addTrip';
import { genFrom } from './js/generateFrom';
import { postD } from './js/postData';
import { updUi } from './js/updateUi.js';
import { addInfo } from './js/addTripInfo.js'

import defTripImg from './media/defTrip.jpg';

import './styles/styles.scss';



document.getElementById('saveTrip').addEventListener('click', addNewTrip);
// document.getElementById('history__entries__table').addEventListener('click', loadEntry)
updUi();

export {
  postD,
  updUi,
  genFrom,
  addInfo,
  defTripImg
}
