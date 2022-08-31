import React, { useEffect, useState } from "react";
import { Field } from "formik";

const Choose = ({
  id,
  value,
  content,
  noVerticalMargins,
  radio,
  name,
  onChoose,
}: {
  id: string;
  value: string;
  content: any;
  name: string;
  noVerticalMargins?: boolean;
  radio?: boolean;
  onChoose: (p: any) => void;
}) => {
  const colors = [
    "red",
    "orange",
    "lime",
    "green",
    "teal",
    "cyan",
    "blue",
    "violet",
    "pink",
  ];
  const [color, setColor] = useState("");
  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];

  useEffect(() => {
    setColor(getRandomColor());
  }, []);
  return (
    <div className={`${noVerticalMargins ? "mx-1" : "m-1"}`}>
      <Field
        name={name}
        className="hidden peer"
        type={radio ? "radio" : "checkbox"}
        id={id}
        value={value}
        onClick={(e: any) => {
          onChoose(e.target.value);
        }}
      />
      <label
        htmlFor={id}
        className={`
            w-full
            text-center
            cursor-pointer
            peer-checked:border-slate-900
            peer-checked:bg-${color}-200
            peer-checked:shadow
            p-2
            rounded-lg
            border
            border-grey-200
            inline-block
            box-border
            transition
            `}
      >
        {content}
      </label>
    </div>
  );
};

export default Choose;
