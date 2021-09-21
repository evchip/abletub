import * as Yup from 'yup';
import moment from 'moment';
import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
  }
} = postFormModel;

export default [
  Yup.object().shape({
    [trackName.name]: Yup.string().required(`${trackName.requiredErrorMsg}`),
    [trackDescription.name]: Yup.string().required(`${trackDescription.requiredErrorMsg}`),
  })
];
