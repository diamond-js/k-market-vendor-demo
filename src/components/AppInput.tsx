import React, {
  HTMLAttributes,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: HTMLInputTypeAttribute;
}

const AppInput = ({ label, type, ...inputProps }: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <label
        htmlFor={inputProps.id}
        className="font-medium"
      >
        {label}
      </label>
      <input
        {...inputProps}
        className="px-6 py-4 border border-gray-300 rounded-lg"
        id={inputProps.id}
        type={type}
      />
    </div>
  );
};

export default AppInput;
