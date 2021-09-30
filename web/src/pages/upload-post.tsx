import React, { ReactElement, useState, createContext } from "react";
import { Formik, Form } from "formik";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { useCreatePostMutation } from "../generated/graphql";
import validationSchema from "../utils/FormModel/validationSchema";
import postFormModel from "../utils/FormModel/postFormModel";
import formInitialValues from "../utils/FormModel/formInitialValues";
import ImageForm from "components/Forms/ImageForm";
import TrackForm from "components/Forms/TrackForm";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "utils/createUrqlClient";
import { Layout } from "components/Layout";
import { useIsAuth } from "utils/useIsAuth";
import { withApollo } from "utils/withApollo";
import { fileSelected } from "utils/IPFSUploads/upload";

export const FormContext = createContext("");

const steps = ["track", "track details"];
const { formId, formField } = postFormModel;

function _renderStepContent(step: number, formProps: any) {
  switch (step) {
    case 0:
      return <TrackForm formField={formField} formProps={formProps} />;
    case 1:
      return <ImageForm formField={formField} formProps={formProps} />;
    default:
      return <ImageForm formField={formField} formProps={formProps} />;
  }
}

interface Props {}

interface FormValues {
  [x: string]: any;
}

function UploadPost({}: Props): ReactElement {
  const [createPost] = useCreatePostMutation();
  const router = useRouter();
  useIsAuth();
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const toast = useToast();

  const popToast = async () => {
    toast({
      title: "tub created.",
      description: "your tub may take a few moments to show up",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const _submitForm = async (
    values: FormValues,
    actions: any
  ): Promise<void> => {

    const audio = await fileSelected(values.audio, values.trackName)
    const image = await fileSelected(values.image, values.trackName)

    const inputValues = {
      title: values.trackName,
      text: values.trackDescription,
      audioFileName: audio!.fileGatewayURL,
      imageFileName: image!.fileGatewayURL,
    };

    const { errors } = await createPost({
      variables: { input: inputValues },
      update: (cache) => {
        cache.evict({ fieldName: "posts" });
        cache.gc();
      },
    });
    if (errors) {
      console.log("error", errors);
    } else {
      popToast();
      actions.setSubmitting(false);
      setActiveStep(activeStep + 1);
      router.push("/");
    }
  };

  function _handleSubmit(values: FormValues, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  // function _handleBack() {
  //   setActiveStep(activeStep - 1);
  // }

  return (
    <Layout variant="regular">
      <Flex justifyContent="center">
        <Formik
          initialValues={formInitialValues}
          validationSchema={currentValidationSchema}
          onSubmit={_handleSubmit}
        >
          {(FormProps) => (
            <Flex justifyContent="center" w={["90%", "50rem"]}>
              <Form id={formId} style={{ display:"flex", justifyContent:"center", flexDirection:"column" }}>
                {_renderStepContent(activeStep, FormProps)}

                <Flex justifyContent="flex-end">
                  {isLastStep ? (
                    <Button
                      disabled={
                        FormProps.isSubmitting || FormProps.values.image == ""
                      }
                      isLoading={FormProps.isSubmitting}
                      type="submit"
                      colorScheme="pink"
                      variant="solid"
                      m="auto"
                      my={8}
                    >
                      submit
                    </Button>
                  ) : (
                    <Button
                      disabled={
                        FormProps.isSubmitting || FormProps.values.audio == ""
                      }
                      isLoading={FormProps.isSubmitting}
                      type="submit"
                      colorScheme="pink"
                      variant="solid"
                      m="auto"
                      my={8}
                    >
                      next
                    </Button>
                  )}
                </Flex>
              </Form>
              </Flex >
          )}
        </Formik>
      </Flex>
    </Layout>
  );
}

export default withApollo({ ssr: false })(UploadPost);
