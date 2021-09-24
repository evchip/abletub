import * as Yup from 'yup';
import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
    image,
    audio
  }
} = postFormModel;

export default [
  Yup.object().shape({
    [audio.name]: Yup.string().required(`${audio.requiredErrorMsg}`),
    [audio.name]: Yup.mixed()
      .test('audioFileSize', `${audio.invalidErrorMsg}`, (val) => {
        return val[0].size <= 50000000
      })
  }),
  Yup.object().shape({
    [trackName.name]: Yup.string().required(`${trackName.requiredErrorMsg}`),
    [trackDescription.name]: Yup.string().required(`${trackDescription.requiredErrorMsg}`),
    [image.name]: Yup.string().required(`${image.requiredErrorMsg}`)
  })
];
