import React from 'react';
import notFound from '../assets/notFound.jpg';

const NotFoundPage = () => {
  // const { t } = useTranslation();
  console.log('');
  return (
    <div className="text-center">
      <img alt="not found" className="img-fluid h-25" src={notFound} />
      <h1 className="h4 text-muted">
        Страница не найдена
      </h1>
      <p className="text-muted">
        Но вы можете перейти на
        <a href="/">главную страницу</a>
      </p>
    </div>
  );
};

export default NotFoundPage;
