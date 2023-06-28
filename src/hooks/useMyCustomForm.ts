import { isEmail, isNotOnlyNumber, maxLength, minLength } from "@/utils/validate-util";
import { useState } from "react";

export interface ICustomFormItem {
  name: string,
  type: 'text' | 'email' | 'password'
  validations: {type: ValidationType, value: string | number}[],
  invalid?: boolean,
  errorMessage?: string,
  isTouch?: boolean,
  value?: string
}

const getFormItem = (item: ICustomFormItem): ICustomFormItem => {
  return {
    ...item,
    invalid: item.validations.length > 0 ? true : false,
    errorMessage: undefined,
    isTouch: false,
    value: ''
  };
}

const createFormObject = (formsItems: ICustomFormItem[]): {[key: string]: ICustomFormItem} => {
  const formObject: {[key: string]: ICustomFormItem} = {};
  formsItems.forEach(formItem => {
    formObject[formItem.name] = getFormItem(formItem);
  });
  return formObject;
}

type ValidationType = 'min' | 'max' | 'isEmail' | 'notOnlyNumber';

export const useMyCustomForm = (formsItems: ICustomFormItem[]) => {
  const [formObj, setFormObj] = useState({...createFormObject(formsItems)});
  const [isValidForm, setIsValidForm] = useState(false);

  const makeTouch = (key: string, value: string): void => {
    if (!formObj[key].isTouch) {
      setFormObj(fObj => {
        fObj[key].isTouch = true;
        setField(key, value);
        return {...fObj};
      });
    }
  };

  const resetFormObj = (rFormsItems: ICustomFormItem[]) => {
    setFormObj(createFormObject(rFormsItems));
    setIsValidForm(false);
  }

  const setField = (key: string, value: string): void => {
    setFormObj(fObj => {
      fObj[key].value = value;
      return {...fObj};
    });
    const validateList: {type: ValidationType, value: string | number}[] = formObj[key].validations;
    let error = false;
    let tempFormObj = formObj;
    
    for (let i = 0; i < validateList.length; i++) {
      if (validateList[i].type === 'min') {
        error = minLength(+validateList[i].value, value);
        if (error) {
          tempFormObj[key].invalid = true;
          setFormObj(fObj => {
            fObj[key].invalid = true;
            fObj[key].errorMessage = 'Minimum length 6 characters';
            tempFormObj = fObj;
            return {...fObj};
          });
          break;
        }
      }
      if (validateList[i].type === 'max') {
        error = maxLength(+validateList[i].value, value);
        if (error) {
          tempFormObj[key].invalid = true;
          setFormObj(fObj => {
            fObj[key].invalid = true;
            fObj[key].errorMessage = 'Max length 20 characters';
            tempFormObj = fObj;
            return {...fObj};
          });
          break;
        }
      }
      if (validateList[i].type === 'isEmail') {
        error = isEmail(value);
        if (error) {
          tempFormObj[key].invalid = true;
          setFormObj(fObj => {
            fObj[key].invalid = true;
            fObj[key].errorMessage = 'Invalid email';
            tempFormObj = fObj;
            return {...fObj};
          });
          break;
        }
      }
      if (validateList[i].type === 'notOnlyNumber') {
        error = isNotOnlyNumber(value);
        if (error) {
          tempFormObj[key].invalid = true;
          setFormObj(fObj => {
            fObj[key].invalid = true;
            fObj[key].errorMessage = 'The field cannot contain only numbers';
            tempFormObj = fObj;
            return {...fObj};
          });
          break;
        }
      }
    }
    if (!error) {
      tempFormObj[key].invalid = false;
      setFormObj(fObj => {
        fObj[key].invalid = false;
        fObj[key].errorMessage = undefined;
        tempFormObj = fObj;
        return {...fObj};
      });
    }
    let validFlag = true;
    Object.values(tempFormObj).map(el => {
      if (el.invalid) {
        validFlag = false;
      }
    });
    if (validFlag) {
      setIsValidForm(true);
    } else {
      setIsValidForm(false);
    };
  }

  return {makeTouch, formObj, setField, resetFormObj, isValidForm};
}
