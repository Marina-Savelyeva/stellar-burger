import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import {
  getConstructorItems,
  clearIngredients
} from '../../services/ConstructorBurgerSlices';
import { clear, createOrder } from '../../services/OrderSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderData } from '../../services/OrderSlice';
import { getRequestFromUser, getIsAuth } from '../../services/UserSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector(getConstructorItems);

  const orderRequest = useSelector(getRequestFromUser);

  const orderModalData = useSelector(getOrderData);
  const authUser = useSelector(getIsAuth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!authUser) {
      navigate('/login');
    }

    const order: string[] = [
      constructorItems.bun!._id,
      ...constructorItems.ingredients.map(
        (ingredient: { _id: string }) => ingredient._id
      ),
      constructorItems.bun!._id
    ];
    dispatch(createOrder(order));
  };

  const closeOrderModal = () => {
    dispatch(clear());
    dispatch(clearIngredients());
    navigate(-1);
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
