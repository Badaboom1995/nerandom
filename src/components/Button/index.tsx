import React from "react";
// todo any
const Button = ({
  children,
  className,
  onClick,
  type,
  loading,
}: {
  children?: any;
  loading?: boolean;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-stone-800 hover:bg-stone-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600 ${className}`}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;
