import { FC, SyntheticEvent, useState, Dispatch, SetStateAction } from 'react';
import { RegisterUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { registerUser, resetError } from '../../services/user/slice';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.user.error);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!userName || !email || !password) {
      setFormError('Заполните все поля');
      return;
    }

    dispatch(registerUser({ email, name: userName, password }))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        setFormError('');
        navigate('/', { replace: true });
      })
      .catch(() => {});
  };

  const handleEmailChange: Dispatch<SetStateAction<string>> = (value) => {
    setEmail((prev) => (typeof value === 'function' ? value(prev) : value));
    if (formError) setFormError('');
  };

  const handlePasswordChange: Dispatch<SetStateAction<string>> = (value) => {
    setPassword((prev) => (typeof value === 'function' ? value(prev) : value));
    if (formError) setFormError('');
  };

  const handleUserNameChange: Dispatch<SetStateAction<string>> = (value) => {
    setUserName((prev) => (typeof value === 'function' ? value(prev) : value));
    if (formError) setFormError('');
  };

  return (
    <RegisterUI
      errorText={error || formError}
      email={email}
      userName={userName}
      password={password}
      setEmail={handleEmailChange}
      setPassword={handlePasswordChange}
      setUserName={handleUserNameChange}
      handleSubmit={handleSubmit}
    />
  );
};
