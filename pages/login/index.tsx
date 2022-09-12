import { NextPage } from "next";
import { AppIntro } from "../../components/AppIntro/Intro";
import style from "./login.module.css";

const Login: NextPage = () => {
  return (
    <div className={style.container}>
      <AppIntro />
      <div className={style.form}>form</div>
    </div>
  );
};

export default Login;
