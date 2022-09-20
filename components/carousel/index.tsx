import React from "react";
import Image from "next/image";
import classNames from "classnames";
import style from "./carousel.module.css";
import { NextNavButton, PrevNavButton } from "./components/NavButton";

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

const positionFrame = (frames: any, state: any) => {
  Object.values(frames).forEach((el: any, i) => {
    if (i !== state.active) {
      if (i) {
        el.style.transform = `translateY(-${i * 10}px) scaleX(-0.${10 - i})`;
        el.style.opacity = `${15 / i}%`;
        return;
      }
      el.style.transform = `translateY(-${state.active * 10}px) scaleX(-0.${
        10 - state.active
      })`;
      el.style.opacity = `${15 / state.active}%`;
      return;
    }

    if (i === state.active) {
      el.style.transform = "";
      el.style.opacity = "1";
    }
  });
};

export const Carousel = (props: ICarousel) => {
  const framesRef = React.useRef<Record<number, HTMLDivElement>>({});
  const [carouselState, setState] = React.useState({
    active: 0,
    preActive: 0,
    isNext: true,
  });

  React.useEffect(() => {
    positionFrame(framesRef.current, carouselState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    if (isNext) {
    }
  };

  Object.values(framesRef.current).forEach((el, i) => {
    const a = el.getBoundingClientRect();
    console.log({ [i]: a });
  });
  return (
    <div className={flexCol(style.carousel)}>
      <div className={style.imgWrapper}>
        {Object.values(props.items).map((item, key) => {
          return (
            <div
              key={`${item.imgPath}_${key}`}
              className={style.absolute}
              ref={(ref) => ref && (framesRef.current[key] = ref)}
            >
              <Image
                src={item.imgPath}
                data-id={"test"}
                alt="product"
                height="400px"
                width="500px"
              />
            </div>
          );
        })}
      </div>
      <div className={flexCol()}>
        {Object.values(props.items).map((item, index) => {
          return (
            <div
              className={flexCol(
                index !== carouselState.active ? style.hide : ""
              )}
              key={`${item.imgPath}_${index}`}
            >
              <h2 id="title" className={style.title} key={item.imgPath}>
                {item.title}
              </h2>
              <p id="subtitle" className={style.subtitle}>
                {item.subTitle}
              </p>
            </div>
          );
        })}
        <div className={flexRow(style.zIndex)}>
          <PrevNavButton onClick={handlePrev} />
          <NextNavButton onClick={handleNext} />
        </div>
      </div>
    </div>
  );
};

function flexCol(...className: string[]) {
  if (!className) return classNames("flexCol");
  return classNames("flexCol", ...className);
}

function flexRow(...cls: string[]) {
  if (!cls) return classNames("flexRow");
  return classNames("flexRow", ...cls);
}
