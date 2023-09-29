import { InputField } from "@/components/input-field/InputField";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { IForm } from "@/screens/auth/Auth";
import { AuthService } from "@/services/auth.service";
import { FC, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";


export const Register: FC<IForm & {setRegister: () => void}> = ({
  formObj,
  makeTouch,
  setRegister,
  setField,
  isValidForm,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const register = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const registerData: { [key: string]: string | undefined } = {};
    Object.keys(formObj).forEach((key) => {
      registerData[key] = formObj[key].value;
    });
    try {
      const response = await AuthService.register(JSON.stringify(registerData));
      toast.success(response.message);
      setRegister();
    } catch(e: any) {
      const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
      toast.error(errorText);
    } finally {
      setIsLoading(false);
    }
  };

  const clientId = '683786685127-lbfh155lvus59p6omf23cbvq15cep823.apps.googleusercontent.com'

  const googleLogin = () => {

  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form
        className="w-full p-[10px] flex flex-col items-center"
        onSubmit={register}
      >
        <InputField
          title="Name"
          type="text"
          errorMessage={formObj["name"].errorMessage}
          name="name"
          onChangeHandler={setField}
          onBlurHandler={makeTouch}
          isTouch={formObj["name"].isTouch}
          value={formObj["name"].value}
        />
        <InputField
          title="Email"
          type="email"
          errorMessage={formObj["email"].errorMessage}
          name="email"
          onChangeHandler={setField}
          onBlurHandler={makeTouch}
          isTouch={formObj["email"].isTouch}
          value={formObj["email"].value}
        />
        <InputField
          title="Password"
          type="password"
          errorMessage={formObj["password"].errorMessage}
          name="password"
          onChangeHandler={setField}
          onBlurHandler={makeTouch}
          isTouch={formObj["password"].isTouch}
          value={formObj["password"].value}
        />
        <MyButton type="submit" canClick={isValidForm} isLoading={isLoading}>
          REGISTER
        </MyButton>
        <div id="signInButton" onClick={googleLogin}>
          CLICK
        </div>
      </form>
    </>
  );
};
