import Image from "next/image";
import style from "./intro.module.css";

interface IIntro {
  slides: [
    {
      imgSrc: string;
      body: {
        title: string;
        body: string;
      };
    }
  ];
}

export const AppIntro: React.FC<{}> = () => {
  return (
    <div className={style.story}>
      <div className={style.card}>
        <div className={style.cardPlaceholder1}></div>
        <div className={style.cardPlaceholder2}></div>
        <div className={style.imageContainer}>
          <Image
            src={"/assets/images/productInfo_1.png"}
            alt="product"
            height="200px"
            width="250px"
          />
        </div>
      </div>
      <div className={style.detail}>
        <div className="title"></div>
        <div className="text"></div>
        <div className="sliderNav">
          <button type="button" className={style.backButton}></button>
          <ol>
            <label></label>
            <label></label>
            <label></label>
          </ol>
          <button type="button" className={style.nextButton}></button>
        </div>
      </div>
    </div>
  );
};
