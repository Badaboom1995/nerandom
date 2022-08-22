import React from "react";

const Checkbox = ({
  id,
  value,
  content,
}: {
  id: string;
  value: string;
  content: any;
}) => {
  return (
    <div>
      <input className="hidden peer" type="checkbox" id={id} value={value} />
      <label
        htmlFor={id}
        className="
        cursor-pointer
        peer-checked:border-slate-900
        p-2 m-1
        shadow
        rounded-lg
        border-2
        border-grey-200
        inline-block
        box-border"
      >
        {content}
      </label>
    </div>
  );
};

export default Checkbox;
