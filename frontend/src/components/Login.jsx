import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
// import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { useRollbar } from '@rollbar/react';

import { actions } from '../slices/index.js';
import routes from '../routes.js';
import avatarImages from '../assets/avatar.jpg';

const Login = () => {
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);
  const inputRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  // const { t } = useTranslation();
  // const rollbar = useRollbar();
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const res = await axios.post(routes.loginPath(), values);
        // TODO: перенести сервис авторизации в createApi
        dispatch(actions.login(res.data));
        const { from } = location.state || { from: { pathname: routes.chatPagePath() } };
        navigate(from);
      } catch (err) {
        // rollbar.error(err);
        console.error(err);
        if (!err.isAxiosError) {
          // toast.error(t('errors.unknown'));
          return;
        }

        if (err.response?.status === 401) {
          setAuthFailed(true);
          // сообщение об ошибке авторизации показываем в форме, а не в тосте
          inputRef.current.select();
        } else {
          // toast.error(t('errors.network'));
        }
      }
    },
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={avatarImages}
                  className="rounded-circle"
                  alt="login"
                />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="form-floating mb-3">
                  <Form.Control
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    name="username"
                    id="username"
                    autoComplete="username"
                    isInvalid={authFailed}
                    required
                    ref={inputRef}
                    placeholder="Ваш ник"
                  />
                  <Form.Label htmlFor="username">Ваш ник</Form.Label>
                </Form.Group>
                <Form.Group className="form-floating mb-4">
                  <Form.Control
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    name="password"
                    id="password"
                    autoComplete="current-password"
                    isInvalid={authFailed}
                    required
                    placeholder="Пароль"
                  />
                  <Form.Label htmlFor="password">Пароль</Form.Label>
                  {authFailed && <Form.Control.Feedback type="invalid" tooltip>Неверные имя пользователя или пароль</Form.Control.Feedback>}
                </Form.Group>
                <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>

              </Form>

            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта?</span>
                {' '}
                <Link to="/signup">Регистрация</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
