import React, { useEffect, useState } from "react";
import Stepper from "../../components/Stepper";

import { Formik, Form } from "formik";

import { childFlexScreen } from "../../config/mixClasses";
import Hello from "./slides/Hello";
import AboutOne from "./slides/AboutOne";
import AboutTwo from "./slides/AboutTwo";
import Request from "./slides/Request";
import LastCall from "./slides/LastCall";
import Final from "./slides/Final";
import makeRequest from "../../helpers/makeRequest";
import { unwrapAirtable } from "../../helpers/unwrap";

const NetworkingOnboarding = () => {
  const [areas, setAreas]: any = useState(null);
  const [skills, setSkills]: any = useState(null);
  const [occupation, setOccupation]: any = useState(null);

  const getChooseData = (item: any) => {
    return item?.map((item: any) => ({
      content: item.name,
      value: item.id,
    }));
  };

  useEffect(() => {
    const getAreas = makeRequest.get("Areas?&view=Grid%20view");
    const getSkills = makeRequest.get("Skills?&view=Grid%20view");
    const getOccupations = makeRequest.get("Occupation?&view=Grid%20view");
    Promise.all([getAreas, getSkills, getOccupations]).then(function (values) {
      values.forEach((item, index) => {
        if (index === 0) {
          setAreas(unwrapAirtable(item));
        }
        if (index === 1) {
          setSkills(unwrapAirtable(item));
        }
        if (index === 2) {
          setOccupation(unwrapAirtable(item));
        }
      });
    });
  }, []);

  return (
    <div className={childFlexScreen}>
      <Formik
        onSubmit={(results) => {
          console.log(results);
        }}
        initialValues={{}}
      >
        {(props) => (
          <Form className={"flex flex-col grow"}>
            <Stepper
              slides={[
                { component: Hello, hideDefaultControls: true },
                {
                  component: AboutOne,
                  props: {
                    occupation: getChooseData(occupation),
                    choosedOccupationIds: props.values,
                  },
                },
                {
                  component: AboutTwo,
                  props: {
                    areas: getChooseData(areas),
                    skills: getChooseData(skills),
                  },
                },
                {
                  component: Request,
                  props: {
                    areas: getChooseData(areas),
                    skills: getChooseData(skills),
                  },
                },
                {
                  component: LastCall,
                  hideDefaultControls: true,
                  props: props.values,
                },
                {
                  component: Final,
                  hideDefaultControls: true,
                },
              ]}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default NetworkingOnboarding;
