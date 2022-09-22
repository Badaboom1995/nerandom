import React, { useEffect, useState } from "react";
import Stepper from "../../components/Stepper";

import { Formik, Form } from "formik";

import { childFlexScreen } from "../../config/mixClasses";
import Hello from "./components/slides/Hello";
import AboutOne from "./components/slides/AboutOne";
import AboutTwo from "./components/slides/AboutTwo";
import Request from "./components/slides/Request";
import LastCall from "./components/slides/LastCall";
import Final from "./components/slides/Final";
import makeRequest from "../../helpers/makeRequest";
import { unwrapAirtable } from "../../helpers/unwrap";
import Loader from "../../components/Loader";
import Matching from "./components/Matching";

const NetworkingOnboarding = () => {
  const [areas, setAreas]: any = useState(null);
  const [skills, setSkills]: any = useState(null);
  const [occupation, setOccupation]: any = useState(null);
  const [user, setUser]: any = useState(null);

  const getChooseData = (item: any) => {
    return item?.map((item: any) => ({
      content: item.name,
      value: item.id,
    }));
  };

  useEffect(() => {
    const wind: any = window;
    const telegramData = wind.Telegram?.WebApp;
    const user = telegramData?.user;
    if (telegramData?.expand) {
      telegramData?.expand();
    }
    setUser({
      username: user?.username ? `@${user?.username}` : "",
      first_name: user?.first_name,
      last_name: user?.last_name,
      photo_url: user?.photo_url,
    });

    const getAreas = makeRequest.get(
      "Areas?&filterByFormula=Search('1', {level})"
    );
    const getSkills = makeRequest.get(
      "Skills?&filterByFormula=Search('1', {level})"
    );
    const getOccupations = makeRequest.get("Occupation").then((pageOne) => {
      return makeRequest
        .get(`Occupation?offset=${pageOne.data.offset}`)
        .then((pageTwo) => {
          return [...unwrapAirtable(pageOne), ...unwrapAirtable(pageTwo)];
        });
    });

    const sortByAlphabet = (items: any) =>
      items.sort((prev: any, next: any) => (prev.name > next.name ? 1 : -1));
    Promise.all([getAreas, getSkills, getOccupations]).then(function (values) {
      values.forEach((item, index) => {
        if (index === 0) {
          setAreas(sortByAlphabet(unwrapAirtable(item)));
        }
        if (index === 1) {
          setSkills(sortByAlphabet(unwrapAirtable(item)));
        }
        if (index === 2) {
          setOccupation(sortByAlphabet(item));
        }
      });
    });
  }, []);
  // TODO Развязать
  return (
    <div className={`${childFlexScreen} relative`}>
      {user && areas && skills && occupation ? (
        localStorage.getItem("hegai_dataSended") === "yes" ? (
          <Matching dicts={{ skills, areas, occupation }} user={user} />
        ) : user && areas && skills && occupation ? (
          <Formik
            onSubmit={(results) => {
              console.log(results);
            }}
            initialValues={{
              name: user?.first_name,
              lastName: user?.last_name,
              telegram_nickname: user?.username,
            }}
          >
            {(props) => (
              <Form className={"flex flex-col grow"}>
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
                        occupation: getChooseData(occupation),
                        choosedOccupationIds: props.values,
                        user,
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
        ) : (
          <Loader />
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default NetworkingOnboarding;
