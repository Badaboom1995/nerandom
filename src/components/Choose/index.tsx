import React from "react";

const Choose = ({
  id,
  value,
  content,
  noVerticalMargins,
  radio,
  name,
}: {
  id: string;
  value: string;
  content: any;
  name: string;
  noVerticalMargins?: boolean;
  radio?: boolean;
}) => {
  return (
    <div className={`${noVerticalMargins ? "mx-2" : "m-2"}`}>
      <input
        name={name}
        className="hidden peer"
        type={radio ? "radio" : "checkbox"}
        id={id}
        value={value}
      />
      <label
        htmlFor={id}
        className={`
            w-full
            text-center
            cursor-pointer
            peer-checked:border-slate-900
            p-2
            rounded-lg
            border
            border-grey-200
            inline-block
            box-border
            `}
      >
        {content}
      </label>
    </div>
  );
};

export default Choose;
