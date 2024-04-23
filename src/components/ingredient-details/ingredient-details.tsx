import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getIngredient } from '../../services/ConstructorBurgerSlices';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const ingredient = useSelector(getIngredient);

  const { id } = useParams();
  const ingredientData = ingredient.find((product) => product._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
