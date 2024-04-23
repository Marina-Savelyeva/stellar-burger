import { FC, memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
//import { useSelector, useDispatch } from 'react-redux';
import { useDispatch, useSelector } from '../../services/store';
import { addIngredient, addBun } from '../../services/ConstructorBurgerSlices';
import { TIngredient } from '../../utils/types';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };
    return (
      <BurgerIngredientUI
        key={ingredient._id}
        ingredient={ingredient}
        count={count}
        locationState={{ background: location }}
        handleAdd={handleAdd}
      />
    );
  }
);
