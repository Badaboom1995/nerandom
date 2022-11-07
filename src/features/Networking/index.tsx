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
import Loader from "../../components/Loader";
import Matching from "./components/Matching";
import { getUserByTGNick } from "../../services/users";
import { track } from "@amplitude/analytics-browser";
import { useDictsBootstrap } from "../../recoil/dicts/dictsActions";
import userAtom from "../../recoil/user/userAtom";
import { useRecoilValue } from "recoil";

const NetworkingOnboarding = () => {
  const dicts = useDictsBootstrap();
  const { skills, areas, occupation } = dicts;

  const [user, setUser]: any = useState(null);
  const [isLoadingFinish, setLoadingStatus]: any = useState(false);
  const [isDataSent, setIsDataSent]: any = useState(false);

  const getChooseData = (item: any) => {
    return item?.map((item: any) => ({
      content: item.name,
      value: item.id,
    }));
  };

  useEffect(() => {
    if (dicts.fulfilled) {
      setLoadingStatus(true);
    }
  }, [dicts.loading]);

  useEffect(() => {
    const wind: any = window;
    const telegramData = wind.Telegram?.WebApp;
    const user = telegramData?.initDataUnsafe.user;
    if (telegramData?.expand) {
      telegramData?.expand();
    }

    setUser({
      username: user?.username ? `@${user?.username}` : "",
      first_name: user?.first_name,
      last_name: user?.last_name,
      photo_url: user?.photo_url,
    });

    getUserByTGNick(user?.username).then((res: any) => {
      setIsDataSent(res?.finishedOnboardings?.includes("networking"));
      track("gotContent");
    });

    const sortByAlphabet = (items: any) =>
      items.sort((prev: any, next: any) => (prev.name > next.name ? 1 : -1));
  }, []);

  // TODO Развязать
  return (
    <div className={`${childFlexScreen} relative network`}>
      {isLoadingFinish ? (
        isDataSent ? (
          <Matching />
        ) : user && dicts.fulfilled ? (
          <Formik
            onSubmit={(results) => {
              console.log("");
            }}
            initialValues={{
              name: user?.first_name,
              lastName: user?.last_name,
              telegram_nickname: user?.username,
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
