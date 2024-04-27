import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login.jsx';
import ChatPage from './ChatPage.jsx';
import routes from '../routes.js';
import NotFoundPage from './NotFoundPage.jsx';
import Navbar from './Navbar.jsx';

const PrivateOutlet = () => {
  const auth = useSelector((state) => state.auth);
  return auth.token ? <Outlet /> : <Navigate to={routes.loginPagePath()} />;
};

const App = () => (
  <BrowserRouter>
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path={routes.loginPagePath()} element={<Login />} />
        <Route path={routes.chatPagePath()} element={<PrivateOutlet />}>
          <Route path="" element={<ChatPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>

  </BrowserRouter>
);

export default App;
