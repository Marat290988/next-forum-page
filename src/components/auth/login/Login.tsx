import { InputField } from "@/components/input-field/InputField";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { useActions } from "@/hooks/useActions";
import { IForm } from "@/screens/auth/Auth";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const Login: FC<IForm & { setLogin: () => void }> = ({
  formObj,
  makeTouch,
  setField,
  isValidForm,
  setLogin,
}) => {
  const { setUser } = useActions();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const login = async (e: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    e.preventDefault();
    const loginData: { [key: string]: string | undefined } = {};
    Object.keys(formObj).forEach((key) => {
      loginData[key] = formObj[key].value;
    });
    try {
      const response = await AuthService.login(JSON.stringify(loginData));
      setUser(response.user);
      toast.success(response.message);
      setLogin();
      router.replace('/');
    } catch (e: any) {
      const errorText = e.response.data.message ? e.response.data.message : 'The endpoint does not exist.';
      toast.error(errorText);
    } finally {
      setIsLoading(false);
    }
  };

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
        onSubmit={login}
      >
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
          LOGIN
        </MyButton>
      </form>
    </>
  );
};
