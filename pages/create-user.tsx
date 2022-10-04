import * as z from "zod";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import s from "./styles/authLayout.module.css";
import { Carousel } from "../components/carousel";
import { BaseInput } from "../components/ui/Input/Input";
import { appInfo } from "../utils";
import { createUserSchema } from "../utils/validationSchema";

interface IFieldVales {
  email: string;
  newPassword: string;
  name: string;
  newUserName: string;
  repeatPassword: string;
}

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFieldVales>({
    resolver: zodResolver(createUserSchema),
  });

  const submitLogin = (d: IFieldVales) => {};

  return (
    <div className={s.login}>
      <div className={s.formContainer}>
        <div className={s.headerSection}>
          <h2>Create account</h2>
          <h3>Get access to exclusive features by creating an account</h3>
        </div>
        <form onSubmit={handleSubmit(submitLogin)}>
          <div className={s.inputContainer} id="name">
            <label>Name</label>
            <BaseInput
              type="name"
              placeholder="name"
              inputSize="xs"
              error={errors["name"]?.message}
              {...register("name", { required: true })}
            />
          </div>
          <div className={s.inputContainer} id="userName">
            <label>User name</label>
            <BaseInput
              placeholder="username"
              inputSize="xs"
              error={errors["newUserName"]?.message}
              {...register("newUserName", { required: true })}
            />
          </div>
          <div className={s.inputContainer} id="email">
            <label>E-mail</label>
            <BaseInput
              type="email"
              placeholder="email"
              inputSize="xs"
              error={errors["email"]?.message}
              {...register("email", { required: true })}
            />
          </div>
          <div className={s.inputContainer} id="password">
            <label>Password</label>
            <BaseInput
              type="password"
              placeholder="password"
              inputSize="xs"
              error={errors["newPassword"]?.message}
              {...register("newPassword", { required: true })}
            />
          </div>
          <div className={s.inputContainer} id="repeat-password">
            <label>Repeat password</label>
            <BaseInput
              type="password"
              placeholder="Repeat password"
              error={errors["repeatPassword"]?.message}
              inputSize="xs"
              {...register("repeatPassword", { required: true })}
            />
          </div>

          <div className={classNames(s.submitWrapper, "text-align-right")}>
            <div className={s.submitButton}>
              <button type="submit"> Create my account</button>
            </div>
          </div>
          <div className={s.centerText}>
            {`Already have an account?`}
            <span>
              &nbsp;
              <Link href="/login" type="button">
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
      <div className={s.info}>
        <Carousel items={appInfo} autoPlay={true} />
      </div>
    </div>
  );
};

export default CreateUser;
