import React from "react";

const Textarea = ({
  name,
  className,
  label,
}: {
  name: string;
  label: any;
  className?: string;
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`font-medium text-sm pl-3`}>{label}</label>
      <textarea
        name={name}
        rows={4}
        cols={12}
        className="
        hover:outline-none
        focus:outline-none
        cursor-pointer
        p-2 m-1
         bg-gray-50
        rounded-lg
        border
        border-gray-200
        inline-block
        box-border"
      />
    </div>
  );
};

export default Textarea;
