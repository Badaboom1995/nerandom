import React from "react";
import Checkbox from "../Checkbox";

const CheckboxGroup = ({
  groupName,
  options,
}: {
  groupName: string;
  options: { content: any; value: string }[];
}) => {
  return (
    <div className={"flex flex-wrap"}>
      {options.map((item) => (
        <Checkbox
          id={`${groupName}-${item.value}`}
          value={item.value}
          content={item.content}
        />
      ))}
    </div>
  );
};

export default CheckboxGroup;
