import { InputField } from "@/components/input-field/InputField";
import { MyButton } from "@/components/ui/MyButton/MyButton";
import { IForm } from "@/screens/auth/Auth";
import { AuthService } from "@/services/auth.service";
import { FC, FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import {OAuth2Client} from 'google-auth-library';


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
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params: any = {'client_id': clientId,
                  'redirect_uri': 'http://localhost:3000/wait',
                  'response_type': 'token',
                  'scope': 'https://www.googleapis.com/auth/cloud-platform.read-only',
                  'include_granted_scopes': 'true',
                  };

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
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
