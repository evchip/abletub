export default {
    formId: 'postForm',
    formField: {
      trackName: {
        name: 'trackName',
        label: 'track name*',
        requiredErrorMsg: 'track name is required'
      },
      trackDescription: {
        name: 'trackDescription',
        label: 'track description*',
        requiredErrorMsg: 'track description is required'
      },
      genre: {
        name: 'genre',
        label: 'genre',
      },
      image: {
        name: 'image',
        label: 'image',
        requiredErrorMsg: 'image is required',
        invalidErrorMsg: 'file is too large. max size is 12 MB.'
      },
      audio: {
        name: 'audio',
        label: 'audio',
        requiredErrorMsg: 'audio track is required',
        invalidErrorMsg: "file is too large. max size is 50 MB."
      }
    }
  };

export interface formTypes {

    trackName: {
      name: string,
      label: string,
      requiredErrorMsg: string
    },
    trackDescription: {
      name: string,
      label: string,
      requiredErrorMsg: string
    },
    genre: {
      name: string,
      label: string,
    },
    image: {
      name: string,
      label: string,
      requiredErrorMsg: string,
      invalidErrorMsg: string
    },
    audio: {
      name: string,
      label: string,
      requiredErrorMsg: string,
      invalidErrorMsg: string
    }
}
  