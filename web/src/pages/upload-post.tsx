import React, { ReactElement, useState, createContext } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   CircularProgress
// } from '@mui/material';
import { Formik, Form } from "formik";
import { Text, Button } from "@chakra-ui/react";

import InfoForm from "../components/Forms/InfoForm";
// import PaymentForm from './Forms/PaymentForm';
// import ReviewOrder from './ReviewOrder';
import PostSuccess from "../components/PostSuccess";

// import validationSchema from '../utils/FormModel/validationSchema';
import postFormModel from "../utils/FormModel/postFormModel";
import formInitialValues from "../utils/FormModel/formInitialValues";
import ImageForm from "components/Forms/ImageForm";
import TrackForm from "components/Forms/TrackForm";

export const FormContext = createContext("");

const steps = ["track", "track details"];
const { formId, formField } = postFormModel;

function _renderStepContent(step: number) {
  switch (step) {
    case 0:
      return <TrackForm />;
    case 1:
      return (
        <>
          <ImageForm />
          <InfoForm formField={formField} />
        </>
      );
    default:
      return <div>Not Found</div>;
  }
}

interface Props {}

function UploadPost({}: Props): ReactElement {
  const [activeStep, setActiveStep] = useState(0);
  // const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  function _sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function _submitForm(values, actions) {
      console.log('form values', values)
    await _sleep(1000);
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Text component="h1" align="center">
        post track
      </Text>
      <React.Fragment>
        {activeStep === steps.length ? (
          <PostSuccess />
        ) : (
          <Formik
            initialValues={formInitialValues}
            // validationSchema={currentValidationSchema}
            onSubmit={_handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {_renderStepContent(activeStep)}

                <div>
                  {activeStep !== 0 && (
                    <Button onClick={_handleBack}>Back</Button>
                  )}
                  <div>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      {isLastStep ? "Place order" : "Next"}
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}

export default UploadPost;
