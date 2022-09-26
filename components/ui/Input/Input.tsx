import React from "react";
import classNames from "classnames";
import s from "./Input.module.css";
import { size } from "../types";
import { fontSize, styleToObj } from "./util";

interface IInput extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  value: string;
  inputSize?: size;
  type?: string;
  inline?: boolean;
  disabled?: boolean;
  hasError?: boolean;
  error?: string;
  placeholder: string;
}

export const BaseInput = ({
  label,
  value,
  hasError,
  disabled,
  placeholder,
  type = "text",
  inline = true,
  inputSize = "sm",
  error = "Invalid Input",
  ...inputProps
}: IInput) => {
  const root = classNames(s.root, {
    [s.inline]: inline,
    [s.error]: hasError,
    [s.disabled]: disabled,
  });

  const size = fontSize[inputSize];

  return (
    <div className={root} id="root_input" style={styleToObj(size)}>
      {label ? <label>{label}</label> : null}
      <div className={s.inputWrapper}>
        <input
          disabled
          type={type}
          value={value}
          placeholder={placeholder}
          {...inputProps}
        />
        <div className={s.errorWrapper}>{error}</div>
      </div>
    </div>
  );
};
