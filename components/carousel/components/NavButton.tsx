import { ReactEventHandler } from "react";
import style from "./navButton.module.css";
import { MdKeyboardArrowLeft as PrevIcon } from "react-icons/md";
import { MdKeyboardArrowRight as NextIcon } from "react-icons/md";

interface IProps {
  onClick: ReactEventHandler;
}
export const PrevNavButton = ({ onClick }: IProps) => {
  return (
    <div className={style.buttonContainer} onClick={onClick}>
      <button>
        <PrevIcon />
      </button>
    </div>
  );
};

export const NextNavButton = ({ onClick }: IProps) => {
  return (
    <div className={style.buttonContainer} onClick={onClick}>
      <button>
        <NextIcon />
      </button>
    </div>
  );
};
