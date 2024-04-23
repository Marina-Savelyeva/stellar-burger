import { getIngredientsApi } from '@api';
import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

export type TConstructorBurger = {
  ingredients: TIngredient[];
  isLoading: Boolean;
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TConstructorBurger = {
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

const IDrandom = () => self.crypto.randomUUID(); //генерация случайного идентификатора бургера

const ConstructorBurgerSlice = createSlice({
  name: 'СonstructorBurger',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      //добавить булочки
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
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: IDrandom() }
      })
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
    ingredientMoveUp: (state, action) => {
      const index = state.constructorItems.ingredients[action.payload];
      const previousIngredient =
        state.constructorItems.ingredients[action.payload - 1];
      state.constructorItems.ingredients.splice(
        action.payload - 1,
        2,
        index,
        previousIngredient
      );
    },
    ingredientMoveDown: (state, action) => {
      const index = state.constructorItems.ingredients[action.payload];
      const nextIngredient =
        state.constructorItems.ingredients[action.payload + 1];
      state.constructorItems.ingredients.splice(
        action.payload,
        2,
        nextIngredient,
        index
      );
    }
  },
  selectors: {
    getIngredient: (state) => state.ingredients,
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

export const { getIngredient, getConstructorItems, getIsLoading } =
  ConstructorBurgerSlice.selectors;
export const {
  addBun,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  ingredientMoveDown,
  ingredientMoveUp
} = ConstructorBurgerSlice.actions;
export const ConstructorBurger = ConstructorBurgerSlice.reducer;
