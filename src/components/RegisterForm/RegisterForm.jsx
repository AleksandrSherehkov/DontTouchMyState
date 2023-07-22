import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { signUpThunk } from 'redux/auth/authOperations';
import { Button } from 'components/Button/Button';
import { FormError } from 'components/FormError/FormError';
import { Logo } from 'components/Logo/Logo';
import { registerSchema } from 'services/validation/validationRegisterSchema';
import {
  EmailIcon,
  FieldStyled,
  FormStyled,
  PasswordlIcon,
  PasswordlIconLook,
  WrapperButton,
  WrapperField,
  WrapperForm,
  WrapperIcon,
  WrapperIcon2,
  WrapperIcon3,
} from 'components/LoginForm/LoginForm.styled';

import { LinkStyled, NameRegisterIcon } from './RegisterForm.styled';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { usePasswordToggle } from 'hook/usePasswordToggle';

export const RegisterForm = () => {
  const { showPassword1, showPassword2, togglePasswordVisibility1, togglePasswordVisibility2 } =
    usePasswordToggle();
  const dispatch = useDispatch();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handleSubmit = (value, { resetForm }) => {
    const { username, email, password } = value;
    dispatch(signUpThunk({ username, email, password }));
    console.log(value);
    resetForm();
  };

  return (
    <WrapperForm>
      <Logo />
      <Formik
        initialValues={initialValues}
        validationSchema={registerSchema}
        onSubmit={handleSubmit}
      >
        <FormStyled autoComplete="off">
          <WrapperField>
            <WrapperIcon>
              <FieldStyled type="text" name="username" placeholder="First name" required />
              <NameRegisterIcon />
            </WrapperIcon>
            <FormError name="username" />
            <WrapperIcon>
              <FieldStyled type="email" name="email" placeholder="Email" required />
              <EmailIcon />
            </WrapperIcon>
            <FormError name="email" />

            <WrapperIcon3>
              <WrapperIcon2>
                <FieldStyled
                  type={showPassword1 ? 'text' : 'password'}
                  name="password"
                  title="Enter the password more difficult, letter, digit, capital letter."
                  placeholder="Password"
                  required
                />
                <PasswordlIcon />
              </WrapperIcon2>
              <PasswordlIconLook>
                {showPassword1 ? (
                  <FaEye onClick={togglePasswordVisibility1} />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility1} />
                )}
              </PasswordlIconLook>
            </WrapperIcon3>
            <FormError name="password" />

            <WrapperIcon3>
              <WrapperIcon2>
                <FieldStyled
                  type={showPassword2 ? 'text' : 'password'}
                  name="confirmPassword"
                  title="Enter the password more difficult, letter, digit, capital letter."
                  placeholder="confirmPassword Password"
                  required
                />
                <PasswordlIcon />
              </WrapperIcon2>
              <PasswordlIconLook>
                {showPassword2 ? (
                  <FaEye onClick={togglePasswordVisibility2} />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility2} />
                )}
              </PasswordlIconLook>
            </WrapperIcon3>
            <FormError name="confirmPassword" />
          </WrapperField>
          <WrapperButton>
            <Button type="submit" text="register" />
            <LinkStyled to="/login">Log in</LinkStyled>
          </WrapperButton>
        </FormStyled>
      </Formik>
    </WrapperForm>
  );
};
