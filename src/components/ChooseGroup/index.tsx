import React from "react";
import Choose from "../Choose";

const ChooseGroup = ({
  groupName,
  options,
  className,
  label,
  noVerticalMargins,
  radio,
}: {
  groupName: string;
  options: { content: any; value: string }[];
  className?: string;
  label?: string;
  noVerticalMargins?: boolean;
  radio?: boolean;
}) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      <label className={`font-medium text-sm pl-3 w-full`}>{label}</label>
      <div className="flex flex-wrap">
        {options.map((item) => (
          <Choose
            id={`${groupName}-${item.value}`}
            key={`${groupName}-${item.value}`}
            name={groupName}
            value={item.value}
            content={item.content}
            noVerticalMargins={noVerticalMargins}
            radio={radio}
          />
        ))}
      </div>
    </div>
  );
};

export default ChooseGroup;
