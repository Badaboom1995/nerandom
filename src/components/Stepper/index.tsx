import React, { Component, useEffect, useState } from "react";
import Button from "../Button";

type Slide = {
  component: any;
  goBack?: () => void;
  goForward?: () => void;
  useCustomControls?: boolean;
};

interface IStepper {
  slides: any[];
}

const Stepper = ({ slides }: IStepper) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [CurrentSlide, setSlide]: any = useState(null);

  useEffect(() => {
    setSlide(slides[stepNumber]);
  }, [stepNumber]);

  const nextStep = () => {
    if (stepNumber < slides.length - 1) {
      setTimeout(() => {
        setStepNumber(stepNumber + 1);
      }, 300);
    }
  };
  const prevStep = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
    }
  };

  return (
    <div className={"flex flex-col grow"}>
      <div className="flex-grow">
        {CurrentSlide && <CurrentSlide.component next={nextStep} />}
      </div>
      {!CurrentSlide?.hideDefaultControls && (
        <div className="flex justify-between">
          <button className="" onClick={prevStep}>
            Назад
          </button>
          <Button className="w-20" onClick={nextStep}>
            Дальше
          </Button>
        </div>
      )}
    </div>
  );
};

export default Stepper;
