import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
    genre,
    audio,
    image
  }
} = postFormModel;

export default {
  [trackName.name]: '',
  [trackDescription.name]: '',
  [genre.name]: '',
  [audio.name]: '',
  [image.name]: ''
};
