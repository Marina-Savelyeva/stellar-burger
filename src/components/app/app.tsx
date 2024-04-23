import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  BrowserRouter
} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { ingredientsApi } from '../../services/ConstructorBurgerSlices';

export const AppRoute = () => {
  //для модалки
  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;

  //для навигации назад, на -1
  const navigate = useNavigate();
  const Back = () => {
    navigate(-1);
  };

  const dispatch = useDispatch();
  //получаем ингридиенты с ссервера
  useEffect(() => {
    dispatch(ingredientsApi());
  }, [dispatch]);

  return (
    <>
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={Back}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Ингредиент'} onClose={Back}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title={'Информация о заказе'} onClose={Back}>
                <OrderInfo />
              </Modal>
            }
          />
        </Routes>
      )}
    </>
  );
};

const App = () => (
  <div className={styles.app}>
    <BrowserRouter>
      <AppHeader />
      <AppRoute />
    </BrowserRouter>
  </div>
);

export default App;
