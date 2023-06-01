import React, {
  HTMLInputTypeAttribute,
  HtmlHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  children?: ReactNode;
}

const AppTextarea = ({ label, children, ...inputProps }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={inputProps.id}
        className="font-medium"
      >
        {label}
      </label>
      <textarea
        {...inputProps}
        className="px-6 py-4 border border-gray-300 rounded-lg resize-none"
        id={inputProps.id}
      >
        {children}
      </textarea>
    </div>
  );
};

export default AppTextarea;
