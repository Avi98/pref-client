import { useCallback } from "react";
import { toast } from "react-toastify";
import { Toast } from "react-toastify/dist/types";

interface IOpenToast {
  message: string;
  props: Partial<Toast["props"]>;
}

export enum ToastTypeEnum {
  INFO = "info",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  Default = "default",
}

export const useToast = () => {
  const openToast = useCallback(
    ({
      message,
      props: {
        theme = "colored",
        autoClose = 1000,
        hideProgressBar = true,
        type,
        ...rest
      },
    }: IOpenToast) => {
      return toast(message, {
        theme,
        autoClose,
        hideProgressBar,
        type,
        ...rest,
      });
    },
    []
  );

  return openToast;
};
