import React from "react";
import { Formik, Form } from "formik";
import AuthView from "./view";

const Auth = () => {
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          const i = {};
        }}
      >
        <Form>
          <AuthView />
        </Form>
      </Formik>
    </div>
  );
};

export default Auth;
