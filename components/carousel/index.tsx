import React from "react";
import Image from "next/image";
import style from "./carousel.module.css";
import { NextNavButton, PrevNavButton } from "./components/NavButton";
import classNames from "classnames";

interface ICarousel {
  items: {
    [position: number]: {
      imgPath: string;
      title: string;
      subTitle: string;
    };
  };
  autoPlay: boolean;
}

export const Carousel = (props: ICarousel) => {
  const framesRef = React.useRef<Record<number, HTMLDivElement>>({});
  const [currentFrameIndex, setCurrentFrameIndex] = React.useState(0);
  const [carouselState, setState] = React.useState({
    active: 0,
    preActive: 0,
    isNext: true,
  });
  const positionFrame = React.useCallback(() => {
    Object.values(framesRef.current).forEach((el, i) => {
      if (i !== currentFrameIndex) {
        el.style.transform = `translateY(-${i * 10}px) scaleX(-0.${10 - i})`;
        el.style.opacity = `${15 / i}%`;
      }
    });
  }, [currentFrameIndex]);

  React.useEffect(() => {
    if (Object.values(framesRef.current).length) {
      positionFrame();
    }
  }, [positionFrame]);

  const handleNext = (e: React.SyntheticEvent) => {
    const { autoPlay } = props;
    const last = Object.keys(props.items).length - 1;

    const index =
      carouselState.active + 1 > last
        ? autoPlay
          ? 0
          : carouselState.active
        : carouselState.active + 1;

    setNext(index, true);
    if (e) {
      e.preventDefault();
    }
  };

  const handlePrev = (e: React.SyntheticEvent) => {
    e?.preventDefault();

    const { autoPlay } = props;
    const index =
      carouselState.active - 1 < 0
        ? autoPlay
          ? 0
          : carouselState.active
        : carouselState.active - 1;
    setNext(index, false);
  };

  const setNext = (index: number, isNext: boolean) => {
    setState({
      active: index,
      preActive: carouselState.active,
      isNext,
    });
  };

  return (
    <div className={flexCol(style.carousel)}>
      <div className={style.imgWrapper}>
        {Object.values(props.items).map((item, key) => {
          return (
            <div
              key={key}
              className={style.absolute}
              ref={(ref) => ref && (framesRef.current[key] = ref)}
            >
              <Image
                src={item.imgPath}
                data-id={"test"}
                alt="product"
                height="200px"
                width="250px"
              />
            </div>
          );
        })}
      </div>
      <div className={flexCol()}>
        <div className={flexRow()}>
          <PrevNavButton onClick={handlePrev} />
          <NextNavButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

function flexCol(className?: string) {
  if (!className) return classNames("flexCol");
  return classNames("flexCol", { [className]: true });
}

function flexRow(cls?: string) {
  if (!cls) return classNames("flexRow");
  return classNames("flexRow", { [cls]: true });
}
