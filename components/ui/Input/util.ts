import { CSSProperties } from "react";
import { size } from "../types";

export const fontSize: Record<size, string> = {
  xs: "--fontSize: 10px; --inputHeight: 30px",
  sm: "--fontSize: 14px; --inputHeight: 36px",
  md: "--fontSize: 16px; --inputHeight: 42px",
  lg: "--fontSize: 18px; --inputHeight: 50px",
  xl: "",
};

export function styleToObj(str: string): CSSProperties {
  const styles = str.split(";");
  let styleObj: CSSProperties = {};
  for (const style of styles) {
    const combined = style.trim().split(":");
    if (style && combined) {
      const prop = combined[0];
      const styleValue = combined[1].trim();

      styleObj = {
        ...styleObj,
        [prop]: styleValue,
      };
    }
  }
  return styleObj;
}
