import { FC, SyntheticEvent, useState } from 'react';
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
    setFormError('');
    dispatch(registerUser({ email, name: userName, password }))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        navigate('/', { replace: true });
      })
      .catch(() => {});
  };

  return (
    <RegisterUI
      errorText={error || formError}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
