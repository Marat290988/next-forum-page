"use client";

import { Login } from "@/components/auth/login/Login";
import { Register } from "@/components/auth/register/Register";
import { ICustomFormItem, useMyCustomForm } from "@/hooks/useMyCustomForm";
import styles from "@/screens/auth/Auth.module.scss";
import Cookies from "js-cookie";
import React, { FC, useState } from "react";

export interface IForm {
  makeTouch: (key: string, value: string) => void;
  formObj: {
    [key: string]: ICustomFormItem;
  };
  setField: (key: string, value: string) => void;
  resetFormObj: (rFormsItems: ICustomFormItem[]) => void;
  isValidForm: boolean;
}

const returnLoginData = (): ICustomFormItem[] => {
  const loginData: ICustomFormItem[] = [
    {
      name: "email",
      type: "email",
      validations: [{ type: "isEmail", value: "" }],
    },
    {
      name: "password",
      type: "password",
      validations: [
        { type: "min", value: 6 },
        { type: "max", value: 20 },
        { type: "notOnlyNumber", value: "" },
      ],
    },
  ];
  return loginData;
};

const returnRegisterData = (): ICustomFormItem => {
  const registerData: ICustomFormItem = {
    name: "name",
    type: "text",
    validations: [
      { type: "min", value: 6 },
      { type: "max", value: 20 },
      { type: "notOnlyNumber", value: "" },
    ],
  };
  return registerData;
};

export const Auth: FC = () => {
  // const token = Cookies.get("token");
  // if (token) {
  //   location.replace('/')
  //   return <></>;
  // }

  const [isLogin, setIsLogin] = useState(true);
  const { makeTouch, formObj, setField, resetFormObj, isValidForm } =
    useMyCustomForm(returnLoginData());

  const setLogin = () => {
    setIsLogin(true);
    resetFormObj(returnLoginData());
  };

  const setRegister = () => {
    setIsLogin(false);
    resetFormObj([...returnLoginData(), returnRegisterData()]);
  };

  return (
    <>
      {(
        <>
          <main className="h-full flex justify-center items-center px-[10px]">
            <div className="max-w-[500px] w-full border-color-dark rounded-tl-lg rounded-tr-lg overflow-hidden">
              <div className={`flex ${styles["header-form"]}`}>
                <h3
                  className={`title-font3 grow p-[8px] ${
                    isLogin ? styles.active : ""
                  } ${styles["auth-title"]}`}
                  onClick={setLogin}
                >
                  LOGIN
                </h3>
                <h3
                  className={`title-font3 grow p-[8px] ${
                    styles["auth-title"]
                  } ${!isLogin ? styles.active : ""}`}
                  onClick={setRegister}
                >
                  REGISTER
                </h3>
              </div>

              {isLogin && (
                <Login
                  makeTouch={makeTouch}
                  formObj={formObj}
                  setField={setField}
                  resetFormObj={resetFormObj}
                  isValidForm={isValidForm}
                  setLogin={setLogin}
                />
              )}
              {!isLogin && (
                <Register
                  makeTouch={makeTouch}
                  formObj={formObj}
                  setField={setField}
                  resetFormObj={resetFormObj}
                  isValidForm={isValidForm}
                  setRegister={setRegister}
                />
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};
