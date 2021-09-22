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
        label: 'image'
      },
      audio: {
        name: 'audio',
        label: 'audio'
      }
    }
  };

export interface formTypes {
  formId: string,
  formField: {
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
      label: string
    },
    audio: {
      name: string,
      label: string
    }
  }
}
  