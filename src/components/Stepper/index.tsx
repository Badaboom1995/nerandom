import React, { Component, useEffect, useState } from "react";
import Button from "../Button";

type Slide = {
  component: any;
  goBack?: () => void;
  goForward?: () => void;
  hideDefaultControls?: boolean;
  props?: Record<string, any> | null;
};

interface IStepper {
  slides: Slide[];
  onDone?: (p: void) => void;
  Empty?: any;
  slideChangeTimeout?: number;
}

const Stepper = ({
  slides,
  onDone,
  slideChangeTimeout = 300,
  Empty,
}: IStepper) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [CurrentSlide, setSlide]: any = useState(null);

  useEffect(() => {
    setSlide(slides[stepNumber]);
    window.scrollTo(0, 0);
  }, [stepNumber]);

  const nextStep = () => {
    if (stepNumber < slides.length - 1) {
      setTimeout(() => {
        setStepNumber(stepNumber + 1);
      }, slideChangeTimeout);
    } else {
      onDone && onDone();
    }
  };
  const prevStep = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
    }
  };

  return (
    <div className={"flex flex-col grow"}>
      <div className="flex-grow flex flex-col">
        {CurrentSlide && slides && (
          <CurrentSlide.component
            next={nextStep}
            prev={prevStep}
            data={CurrentSlide.props}
          />
        )}
        {!slides.length && Empty}
      </div>
      {!CurrentSlide?.hideDefaultControls && !!slides.length && (
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
