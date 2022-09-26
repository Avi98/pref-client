import React from "react";
import { BsCheckLg } from "react-icons/bs";
import classNames from "classnames";
import s from "./checkbox.module.css";
import { Control, Controller } from "react-hook-form";

interface IRadioInput {
  label: string;
  defaultValue?: boolean;
  onChange: (value: boolean) => void;
}
export const CheckboxInput = React.forwardRef(
  (props: IRadioInput, ref: React.Ref<any>) => {
    const { label, onChange, defaultValue = false, ...rest } = props;
    const [isChecked, setIsChecked] = React.useState(defaultValue);

    const handleChecked = (isChecked: boolean) => {
      setIsChecked(!isChecked);
      onChange(!isChecked);
    };

    const root = classNames(s.root, {
      [s.checked]: isChecked,
    });

    return (
      <div className={root} onClick={() => handleChecked(isChecked)} ref={ref}>
        <div>
          <input type="checkbox" {...rest} />
          <BsCheckLg />
        </div>
        <label>{label}</label>
      </div>
    );
  }
);

interface IControlledCheckbox {
  name: string;
  defaultValue?: boolean;
  label: string;
  control?: Control<any>;
}
export const ControlledCheckbox = ({
  name,
  label,
  defaultValue,
  control,
}: IControlledCheckbox) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => {
        return (
          <CheckboxInput
            label={label}
            onChange={onChange}
            defaultValue={value}
          />
        );
      }}
    />
  );
};

CheckboxInput.displayName = "CheckboxInput";
