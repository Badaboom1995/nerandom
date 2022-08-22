import React from "react";
import Stepper from "../../components/Stepper";
import { Slide1, Slide2, Slide3, Slide4 } from "./slides";
import { childFlexScreen } from "../../config/mixClasses";

const NetworkingOnboarding = () => {
  return (
    <div className={childFlexScreen}>
      <Stepper
        slides={[
          { component: Slide1, hideDefaultControls: true },
          { component: Slide2 },
          { component: Slide3 },
          { component: Slide4, hideDefaultControls: true },
        ]}
      />
    </div>
  );
};

export default NetworkingOnboarding;
