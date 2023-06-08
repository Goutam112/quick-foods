import { useState } from 'react';

const useInput = (validateValue) => {
  const [value, setValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const isValid = validateValue(value);
  const hasError = !isValid && isTouched;

  const inputChangeHandler = (event) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setValue('');
    setIsTouched(false);
  };

  return { value, isValid, hasError, inputChangeHandler, inputBlurHandler, reset };
};

export default useInput;
