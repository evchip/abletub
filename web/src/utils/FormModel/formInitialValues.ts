import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
    genre,
  }
} = postFormModel;

export default {
  [trackName.name]: '',
  [trackDescription.name]: '',
  [genre.name]: '',
};
