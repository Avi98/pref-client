import React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import s from "./styles/authLayout.module.css";
import { Carousel } from "../components/carousel";
import { BaseInput } from "../components/ui/Input/Input";
import classNames from "classnames";

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
}

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm<IFieldVales>();

  const submitLogin = (d: IFieldVales) => {};

  return (
    <div className={s.login}>
      <div className={s.formContainer}>
        <div className={s.headerSection}>
          <h2>Password Recovery</h2>
          <h3>
            {`Please fill in the email account that you have used to create a Pref-monitor account and we'll send you reset link`}
          </h3>
        </div>
        <form onSubmit={handleSubmit(submitLogin)}>
          <div className={s.inputContainer} id="email">
            <label>E-mail</label>
            <BaseInput
              type="email"
              placeholder="email"
              inputSize="xs"
              {...register("email", { required: true })}
            />
          </div>
          <div
            className={classNames(s.submitButton, "text-align-right", "mt-10")}
          >
            <button> Reset my password</button>
          </div>
          <div className={s.centerText}>
            <Link href="/login">Back to login</Link>
          </div>
        </form>
      </div>
      <div className={s.info}>
        <Carousel items={appInfo} autoPlay={true} />
      </div>
    </div>
  );
};

export default ForgotPassword;
