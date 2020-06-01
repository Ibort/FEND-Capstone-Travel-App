// import { addForm } from './js/addTextFrom'
import { addNewTrip } from './js/addTrip';
import { scrollToAdd } from './js/scrollToSaveTrip.js';
import { genFrom } from './js/generateFrom';
import { postD } from './js/postData';
import { updUi } from './js/updateUi.js';
import { addInfo } from './js/addTripInfo.js'
import { delTrip } from './js/removeTrip.js'

import defTripImg from './media/defTrip.jpg';

import './styles/styles.scss';



document.getElementById('saveTrip').addEventListener('click', addNewTrip);
document.getElementById('addTrip').addEventListener('click', scrollToAdd);
updUi();

export {
  addNewTrip,
  postD,
  updUi,
  genFrom,
  addInfo,
  delTrip,
  defTripImg
}
