import style from "./login.module.css";
import { Carousel } from "../../components/carousel";

const appInfo = {
  1: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy Info needs to be updated later on",
    subTitle: "Some lengthy Info needs to be updated later on",
  },
  2: {
    imgPath: "/assets/images/productInfo_2.png",
    title: "Some lengthy Info needs to be updated later on2",
    subTitle: "Some lengthy Info 2 needs to be updated later on",
  },
  3: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy Info needs to be updated later on3s",
    subTitle: "Some lengthy Info 3 needs to be updated later on",
  },
};
const Login = () => {
  return (
    <div className={style.login}>
      <div className={style.loginForm}></div>
      <div className={style.info}>
        <Carousel items={appInfo} autoPlay={true} />
      </div>
    </div>
  );
};

export default Login;
