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
import Loader from "../../components/Loader";
import { track } from "@amplitude/analytics-browser";
import { useDictsBootstrap } from "../../recoil/dicts/dictsActions";
import { useRecoilValue } from "recoil";
import userAtom from "../../recoil/user/userAtom";

const NetworkingOnboarding = () => {
  const dicts = useDictsBootstrap();
  const { skills, areas, occupation } = dicts;

  const user = useRecoilValue(userAtom);
  const [isLoadingFinish, setLoadingStatus]: any = useState(false);
  const [isDataSent, setIsDataSent]: any = useState(false);

  const getChooseData = (item: any) => {
    return item?.map((item: any) => ({
      content: item.name,
      value: item.id,
    }));
  };
  return (
    <div className={`${childFlexScreen} relative network`}>
      <Formik
        onSubmit={(results) => {
          console.log(results);
        }}
        initialValues={{
          name: user.fields?.firstname,
          lastName: user.fields?.lastname,
          telegram_nickname: user.fields?.telegram_nickname,
          photoUrl: "",
        }}
      >
        {(props) => (
          <Form className={"flex flex-col grow "}>
            <Stepper
              slides={[
                {
                  component: Hello,
                  hideDefaultControls: true,
                  props: { user },
                },
                {
                  component: AboutOne,
                  props: {
                    choosedOccupationIds: props.values,
                    user,
                  },
                },
                {
                  component: AboutTwo,
                  props: {
                    areas: getChooseData(areas),
                    skills: getChooseData(skills),
                    occupation: getChooseData(occupation),
                    url: props.values.photoUrl,
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
                  props: {
                    values: props.values,
                    dicts: { areas, skills, occupation },
                  },
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
