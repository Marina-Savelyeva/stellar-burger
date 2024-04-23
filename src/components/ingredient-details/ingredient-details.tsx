import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredient } from 'src/services/ConstructorBurgerSlices';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  //const ingredient = useSelector(getIngredient);
  const ingredient = useSelector(
    (state) => state.constructorBurger.ingredients
  );
  const { id } = useParams();
  const ingredientData = ingredient.find((product) => product._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
