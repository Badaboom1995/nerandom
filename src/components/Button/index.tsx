import React from "react";
// todo any
const Button = ({
  children,
  className,
  onClick,
}: {
  children?: any;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;