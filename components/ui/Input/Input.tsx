import React from "react";
import classNames from "classnames";
import s from "./Input.module.css";
import { size } from "../types";
import { fontSize, styleToObj } from "./util";

interface IInput extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  inputSize?: size;
  type?: string;
  inline?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder: string;
}

export const BaseInput = React.forwardRef(
  (
    {
      label,
      disabled = false,
      placeholder,
      type = "text",
      inline = true,
      inputSize = "sm",
      error,
      ...inputProps
    }: IInput,
    ref: React.Ref<any>
  ) => {
    const root = classNames(s.root, {
      [s.inline]: inline,
      [s.error]: Boolean(error),
      [s.disabled]: disabled,
    });

    const size = fontSize[inputSize];

    return (
      <div className={root} id="root_input" style={styleToObj(size)}>
        {label ? <label>{label}</label> : null}
        <div className={s.inputWrapper}>
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...inputProps}
          />
          <div className={s.errorWrapper}>{error}</div>
        </div>
      </div>
    );
  }
);

BaseInput.displayName = "BaseInput";
