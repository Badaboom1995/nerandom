import React from "react";
import { Field } from "formik";

const Input = ({
  name,
  className,
  label,
  textarea,
  placeholder,
}: {
  name: string;
  label: any;
  className?: string;
  textarea?: boolean;
  placeholder?: string;
}) => {
  const styles =
    " hover:outline-none focus:outline-none cursor-pointer p-2 m-1 bg-gray-50 rounded-lg border border-gray-200 inline-block box-border";
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`font-medium text-md pl-3 mb-2`}>{label}</label>
      {textarea ? (
        <Field
          as={"textarea"}
          name={name}
          rows={4}
          cols={12}
          className={styles}
          placeholder={placeholder}
        />
      ) : (
        <Field
          as={"input"}
          name={name}
          className={styles}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default Input;
