import * as React from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { AxiosError } from "axios";
import { Formik } from "formik";
import {
  Form,
  EnumFormStyle,
  Button,
  FormHeader,
  Snackbar,
} from "@amplication/design-system";
import { api } from "../api";
import useBreadcrumbs from "../components/breadcrumbs/use-breadcrumbs";
import { Yes } from "../api/yes/Yes";
import { YesCreateInput } from "../api/yes/YesCreateInput";

const INITIAL_VALUES = {} as YesCreateInput;

export const CreateYes = (): React.ReactElement => {
  useBreadcrumbs("/yeses/new", "Create yes");
  const history = useHistory();

  const [create, { error, isError, isLoading }] = useMutation<
    Yes,
    AxiosError,
    YesCreateInput
  >(
    async (data) => {
      const response = await api.post("/api/yeses", data);
      return response.data;
    },
    {
      onSuccess: (data, variables) => {
        history.push(`${"/yeses"}/${data.id}`);
      },
    }
  );
  const handleSubmit = React.useCallback(
    (values: YesCreateInput) => {
      void create(values);
    },
    [create]
  );
  return (
    <>
      <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
        <Form
          formStyle={EnumFormStyle.Horizontal}
          formHeaderContent={
            <FormHeader title={"Create yes"}>
              <Button type="submit" disabled={isLoading}>
                Save
              </Button>
            </FormHeader>
          }
        ></Form>
      </Formik>
      <Snackbar open={isError} message={error?.response?.data?.message} />
    </>
  );
};
