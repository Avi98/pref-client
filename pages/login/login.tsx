import React from "react";
import s from "./login.module.css";
import { Carousel } from "../../components/carousel";
import { BaseInput } from "../../components/ui/Input/Input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { ControlledCheckbox } from "../../components/ui/Checkbox";

const appInfo = {
  0: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy title Info needs to be updated later on1",
    subTitle:
      "Some lengthy Info needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
  1: {
    imgPath: "/assets/images/productInfo_2.png",
    title: "Some lengthy title2 needs to be updated later on2",
    subTitle:
      "Some lengthy Info 2 needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
  2: {
    imgPath: "/assets/images/productInfo_1.png",
    title: "Some lengthy title3 needs to be updated later on3s",
    subTitle:
      "Some lengthy Info 3 needs to be updated later on. Some lengthy Info needs to be updated later on",
  },
};

interface IFieldVales {
  email: string;
  password: string;
  isRememberMe: boolean;
}

const Login = () => {
  const { register, handleSubmit, watch, control } = useForm<IFieldVales>({
    defaultValues: {
      isRememberMe: false,
    },
  });

  const submitLogin = (d: IFieldVales) => {
    console.log({ d });
  };

  return (
    <div className={s.login}>
      <div className={s.loginForm}>
        <h2>Log in</h2>
        <h3>
          Welcome to Pref Monitor, Please put your login credential below to
          start using the app
        </h3>
        <form onSubmit={handleSubmit(submitLogin)}>
          <div className={s.inputContainer}>
            <label>E-mail</label>
            <BaseInput
              type="email"
              placeholder="email"
              inputSize="xs"
              {...register("email", { required: true })}
            />
          </div>
          <div className={s.inputContainer}>
            <label>Password</label>
            <BaseInput
              type="password"
              placeholder="password"
              inputSize="xs"
              {...register("password", { required: true })}
            />
          </div>
          <Link href="forgotPassword" as="link">
            Forgot Password?
          </Link>
          <ControlledCheckbox
            control={control}
            label="Remember me"
            name="isRememberMe"
          />

          <button> submit</button>
        </form>
      </div>
      <div className={s.info}>
        <Carousel items={appInfo} autoPlay={true} />
      </div>
    </div>
  );
};

export default Login;
