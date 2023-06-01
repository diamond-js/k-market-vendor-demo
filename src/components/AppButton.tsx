import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
}

const AppButton = ({ children, className, ...btnProps }: Props) => {
  return (
    <button
      {...btnProps}
      className={
        "bg-gray-800 text-white rounded-lg py-4 px-6 shadow-md shadow-gray-300 disabled:bg-gray-300 flex items-center justify-center gap-1 " +
        className
      }
    >
      {children}
    </button>
  );
};

export default AppButton;
