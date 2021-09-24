import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
    genre,
    mood,
    audio,
    image
  }
} = postFormModel;

export default {
  [trackName.name]: '',
  [trackDescription.name]: '',
  [genre.name]: '',
  [mood.name]: '',
  [audio.name]: '',
  [image.name]: ''
};
