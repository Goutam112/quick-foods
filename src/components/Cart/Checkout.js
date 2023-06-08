import styles from './Checkout.module.css'
import useInput from '../../hooks/use-input'

const nameValidation = value => value.trim() !== '' && value.trim().includes(' ');
const streetValidation = value => value.trim().length >= 3;
const cityValidation = value => value.trim().length >= 3;
const postalValidation = value => /^([A-Z][0-9][A-Z])\s*([0-9][A-Z][0-9])$/.test(value);

const Checkout = props => {

  const {
    value: nameValue,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetName
  } = useInput(value => nameValidation(value));
  const {
    value: streetValue,
    isValid: streetIsValid,
    hasError: streetHasError,
    inputChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreet
  } = useInput(value => streetValidation(value));
  const {
    value: cityValue,
    isValid: cityIsValid,
    hasError: cityHasError,
    inputChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCity
  } = useInput(value => cityValidation(value));
  const {
    value: postalValue,
    isValid: postalIsValid,
    hasError: postalHasError,
    inputChangeHandler: postalChangeHandler,
    inputBlurHandler: postalBlurHandler,
    reset: resetPostal
  } = useInput(value => postalValidation(value));


  console.log(nameValue, nameIsValid, nameHasError)



  const confirmHandler = event => {
    event.preventDefault();

    nameBlurHandler();
    streetBlurHandler();
    cityBlurHandler();
    postalBlurHandler();

    if (nameIsValid && streetIsValid && cityIsValid && postalIsValid) {

      resetName();
      resetStreet();
      resetCity();
      resetPostal();

      props.onConfirm({ name: nameValue, street: streetValue, city: cityValue, postal: postalValue });
    }
    else {
      console.log('Invalid form inputs!')
    }
  }

  return (
    <form onSubmit={ confirmHandler }>
      <div className={ `${styles.control} ${nameHasError ? styles.invalid : ''}` }>
        <label htmlFor="name">Your Full Name</label>
        <input type="text" id="name" onChange={ nameChangeHandler } onBlur={ nameBlurHandler } value={ nameValue } />
        { nameHasError && <p>Please enter valid full name (eg: John Doe)</p> }
      </div>
      <div className={ `${styles.control} ${streetHasError ? styles.invalid : ''}` }>
        <label htmlFor="street">Street Address</label>
        <input type="text" id="street" onChange={ streetChangeHandler } onBlur={ streetBlurHandler } value={ streetValue } />
        { streetHasError && <p>Please enter valid street name (eg: 123 Simcoe St.)</p> }
      </div>
      <div className={ `${styles.control} ${cityHasError ? styles.invalid : ''}` }>
        <label htmlFor="city">City</label>
        <input type="text" id="city" onChange={ cityChangeHandler } onBlur={ cityBlurHandler } value={ cityValue } />
        { cityHasError && <p>Please enter valid city (eg: Toronto)</p> }
      </div>
      <div className={ `${styles.control} ${postalHasError ? styles.invalid : ''}` }>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" onChange={ postalChangeHandler } onBlur={ postalBlurHandler } value={ postalValue } />
        { postalHasError && <p>Please enter valid postal code (eg: A1A 1A1)</p> }
      </div>
      <div className={ styles.actions }>
        <button type='button' onClick={ props.onCancel }>Cancel</button>
        <button type='submit' className={ styles.submit }>Confirm</button>
      </div>
    </form >
  )
}

export default Checkout;