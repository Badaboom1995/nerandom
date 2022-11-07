import React, { Component, useEffect, useState } from "react";
import Button from "../Button";
import EmptyState from "../../features/Networking/components/Matching/EmptyState";

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
  activeIndex?: number;
  slideChangeTimeout?: number;
}

const Stepper = ({
  slides,
  onDone,
  slideChangeTimeout = 300,
  Empty,
  activeIndex,
}: IStepper) => {
  const [stepNumber, setStepNumber] = useState(activeIndex || 0);
  const [CurrentSlide, setSlide]: any = useState(null);
  const [isDone, setDone]: any = useState(false);

  useEffect(() => {
    setSlide(slides[stepNumber]);
    window.scrollTo(0, 0);
    console.log(slides, stepNumber, slides[stepNumber]);
  }, [stepNumber]);

  const nextStep = () => {
    if (stepNumber < slides.length - 1) {
      setTimeout(() => {
        setStepNumber(stepNumber + 1);
      }, slideChangeTimeout);
    } else {
      setDone(true);
    }
  };
  const prevStep = () => {
    if (stepNumber > 0) {
      setStepNumber(stepNumber - 1);
    }
  };

  if (!slides.length) return <EmptyState />;
  return (
    <div
      className={`flex flex-col grow max-h-fit ${
        !CurrentSlide?.hideDefaultControls && "pb-14"
      }`}
    >
      <div className="flex-grow flex flex-col">
        {CurrentSlide && slides && !isDone && (
          <CurrentSlide.component
            next={nextStep}
            prev={prevStep}
            data={CurrentSlide.props}
          />
        )}
      </div>
      {isDone && Empty}
      {!CurrentSlide?.hideDefaultControls && !!slides.length && (
        <div className="flex justify-between fixed w-full bg-white p-4 left-0 bottom-0 shadow shadow-black">
          <button className="" onClick={prevStep} type={"button"}>
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
