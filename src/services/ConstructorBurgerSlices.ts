import { getIngredientsApi } from '../utils/burger-api';
import {
  PayloadAction,
  createSlice,
  createAsyncThunk,
  nanoid
} from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TConstructorBurger = {
  ingredients: TIngredient[];
  isLoading: Boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TConstructorBurger = {
  ingredients: [],
  isLoading: false,
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const ingredientsApi = createAsyncThunk(
  'ingredients/ingredientsApi',
  getIngredientsApi
); //асинхронная операция

//const IDrandom = () => self.crypto.randomUUID(); //генерация случайного идентификатора бургера

const ConstructorBurgerSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      //добавить булку
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.constructorItems.bun = payload;
        } else {
          state.constructorItems.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return { payload: { ...ingredient, id } };
      }
    },
    deleteIngredient: (state, action) => {
      //удалить ингридиент
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (product) => product.id !== action.payload.id
        );
    },
    clearIngredients: (state) => {
      //очистить поле
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
      state.isLoading = false;
    },
    ingredientMoveUp: (state, action: PayloadAction<number>) => {
      const { ingredients } = state.constructorItems;
      const index = action.payload;
      if (index > 0 && index < ingredients.length) {
        const newIngredients = [...ingredients];
        [newIngredients[index], newIngredients[index - 1]] = [
          newIngredients[index - 1],
          newIngredients[index]
        ];
        state.constructorItems.ingredients = newIngredients;
      }
    },
    ingredientMoveDown: (state, action: PayloadAction<number>) => {
      const { ingredients } = state.constructorItems;
      const index = action.payload;
      if (index >= 0 && index < ingredients.length - 1) {
        [ingredients[index], ingredients[index + 1]] = [
          ingredients[index + 1],
          ingredients[index]
        ];
      }
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getConstructorItems: (state) => state.constructorItems,
    getIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    //3 экшена
    builder.addCase(ingredientsApi.pending, (state) => {
      //перед
      state.isLoading = true;
    }),
      builder.addCase(ingredientsApi.fulfilled, (state, action) => {
        //если без ошибок
        state.isLoading = false;
        state.ingredients = action.payload;
      }),
      builder.addCase(ingredientsApi.rejected, (state) => {
        //если с ошибкой
        state.isLoading = false;
      });
  }
});

export const { getIngredients, getConstructorItems, getIsLoading } =
  ConstructorBurgerSlice.selectors;
export const {
  addBun,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  ingredientMoveDown,
  ingredientMoveUp
} = ConstructorBurgerSlice.actions;
export const constructorBurger = ConstructorBurgerSlice.reducer;
