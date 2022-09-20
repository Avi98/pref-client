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

interface ICarouselState {
  active: number;
  preActive: number;
  isNext: boolean;
}

const animate = (
  frames: Record<number, HTMLDivElement>,
  state: ICarouselState,
  containerRef: HTMLDivElement
) => {
  const current = frames[state.active];
  const lastActive = frames[state.preActive];

  const containerPos = containerRef?.getBoundingClientRect();

  const lastActivePos = lastActive.getBoundingClientRect().y - containerPos.y;

  if (containerPos?.x) {
    //current item fade in
    current.animate(
      [
        {
          opacity: "10%",
        },
        {
          transform: `translateY(-9px) scaleX(0.${9})`,
          opacity: "80%",
          zIndex: 9,
        },
        {
          transform: `translateY(0px) scale(1)`,
          opacity: 1,
        },
      ],
      {
        duration: 1000,
        easing: "ease-in",
      }
    );
  }

  //prev item fade out
  lastActive.animate(
    [
      {
        transform: `translateY(0) scale(1)`,
        opacity: "80%",
      },
      {
        transform: `translateY(10px) scale(1.02) `,
        opacity: "10%",
      },
      {
        opacity: "0",
      },
    ],
    {
      duration: 1000,
      easing: "ease-in",
    }
  );
};
const positionFrame = (
  frames: Record<number, HTMLDivElement>,
  state: ICarouselState
) => {
  Object.values(frames).forEach((el: any, i) => {
    if (i !== state.active) {
      el.style.zIndex = "0";
      if (i) {
        el.style.transform = `translateY(-${i * 10}px) scaleX(0.${10 - i})`;
        el.style.opacity = `${15 / i}%`;
        return;
      }
      el.style.transform = `translateY(-${state.active * 10}px) scaleX(0.${
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
  const containerRef = React.useRef(null);
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
    const state = {
      active: index,
      preActive: carouselState.active,
      isNext,
    };
    setState(state);
    if (containerRef.current)
      animate(framesRef.current, state, containerRef.current);
    setTimeout(() => {
      positionFrame(framesRef.current, state);
    }, 1000);
  };

  Object.values(framesRef.current).forEach((el, i) => {
    const a = el.getBoundingClientRect();
  });
  return (
    <div className={flexCol(style.carousel)}>
      <div className={style.imgWrapper} ref={containerRef}>
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
