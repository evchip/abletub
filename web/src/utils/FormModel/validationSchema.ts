import * as Yup from 'yup';
import moment from 'moment';
import postFormModel from './postFormModel';
const {
  formField: {
    trackName,
    trackDescription,
    image,
    audio
  }
} = postFormModel;

const checkFileSize = (fileSize) => {
  console.log('file size', fileSize)
  return fileSize < 5 ? true: false;
}

export default [
  Yup.object().shape({
    [audio.name]: Yup.string().required(`${audio.requiredErrorMsg}`),
    [audio.name]: Yup.array()
      .test('is-too-big', 'VALIDATION_FIELD_FILE_BIG', checkFileSize)
      // audioFileSize: Yup.number()
      //   .min(1, "please upload a file.")
      //   .max(50000000, "file is too large. max size is 50 MB.")
      //   .required("required"),
      // imageFileSize: Yup.number()
      //   .min(1, "please upload a file.")
      //   .max(15000000, "file is too large. max size is 12 MB.")
      //   .required("required")
  }),
  Yup.object().shape({
    [trackName.name]: Yup.string().required(`${trackName.requiredErrorMsg}`),
    [trackDescription.name]: Yup.string().required(`${trackDescription.requiredErrorMsg}`),
  })
];
