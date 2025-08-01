import React, { useState, type JSX } from "react";
import Button from "../../components/button";
import Input from "../../components/input";
import { ajv } from "../../components/validation";
import type { AnyValidateFunction } from "ajv/dist/types";
import Notify from "../../components/toast";
import { useNavigate } from "react-router-dom";
import type { UserLoginData } from "./types";

export default function Login(): JSX.Element {
  const [user, setUser] = useState<UserLoginData>({
    username: "",
    password: "",
  });
  const [inputError, setInputError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const onSubmit = async () => {
    /* VALIDATION */
    const validate = ajv.getSchema("login") as AnyValidateFunction<unknown>;
    const valid = await validate(user);
    if (!valid) {
      const field: string | undefined =
        validate.errors?.[0]["instancePath"].split("/")[1];
      const msg: string | undefined = validate.errors?.[0]["message"];
      setInputError(field);
      Notify(msg, "error");
      return;
    }

    try {
      /* SERVER REQUEST */
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(user),
          // credentials: "include",
        }
      );
      const data = await response.json();

      /* HTTP ERROR HANDLE */
      if (response.status !== 200) throw data;

      /* SUCCESS -> NAVIGATE TO HOME-PAGE */
      // const token = response.headers.get("authorization");
      localStorage.setItem("session", JSON.stringify({ ...data }));
      Notify(`Добро пожаловать ${data["name"]}`, "success");
      navigate("/");
    } catch (error: any) {
      Notify(error?.message || `LOGIN ERROR`, "error");
      console.error("LOGIN ERROR: ", error);
    } finally {
      if (inputError) setInputError(undefined);
    }
  };

  return (
    <form
      className="registration-page px-5 sm:px-0 pb-24 sm:w-[500px] m-auto translate-y-[40%]"
      onSubmit={(e: React.FormEvent) => e.preventDefault()}
    >
      <h1 className="w-full text-center mb-10 text-default-text text-3xl font-bold">
        Ваш Финансовый Менеджер
      </h1>
      <div className="mt-5">
        <Input
          type="text"
          name="username"
          onChange={onChange}
          value={user.username}
          label="Имя пользователя"
          placeholder="username2025"
          error={inputError === "username" ? true : false}
        />
      </div>
      <div className="mt-5">
        <Input
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
          label="Пароль"
          placeholder="adf44!@$@#"
          error={inputError === "password" ? true : false}
        />
      </div>
      <div className="mt-10">
        <Button text="Войти" onClick={onSubmit} type="submit" />
      </div>
    </form>
  );
}
