import React from "react";

const Input = ({
  name,
  className,
  label,
  textarea,
}: {
  name: string;
  label: any;
  className?: string;
  textarea?: boolean;
}) => {
  const styles =
    " hover:outline-none focus:outline-none cursor-pointer p-2 m-1 bg-gray-50 rounded-lg border border-gray-200 inline-block box-border";
  return (
    <div className={`flex flex-col ${className}`}>
      <label className={`font-medium text-sm pl-3`}>{label}</label>
      {textarea ? (
        <textarea name={name} rows={4} cols={12} className={styles} />
      ) : (
        <input name={name} type="input" className={styles} />
      )}
    </div>
  );
};

export default Input;
