import {
  FC,
  SyntheticEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect
} from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { loginUser, resetError } from '../../services/user/slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const handleEmailChange: Dispatch<SetStateAction<string>> = (value) => {
    setEmail((prev) => (typeof value === 'function' ? value(prev) : value));
    if (error) dispatch(resetError());
  };

  const handlePasswordChange: Dispatch<SetStateAction<string>> = (value) => {
    setPassword((prev) => (typeof value === 'function' ? value(prev) : value));
    if (error) dispatch(resetError());
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const from = (location.state as { from?: string })?.from || '/';
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(resetError());
        navigate(from, { replace: true });
      })
      .catch(() => {});
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={handleEmailChange}
      password={password}
      setPassword={handlePasswordChange}
      handleSubmit={handleSubmit}
    />
  );
};
