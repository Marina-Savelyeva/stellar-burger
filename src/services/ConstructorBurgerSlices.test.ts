import {
  initialState,
  constructorBurger,
  addIngredient,
  deleteIngredient,
  clearIngredients,
  ingredientMoveDown,
  ingredientMoveUp,
  ingredientsApi,
  addBun
} from './ConstructorBurgerSlices';

describe('constructorBurger reducers добавление и удаление', () => {
  const mockIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  };

  it('addBun', () => {
    const bun = {
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      name: 'Краторная булка N-200i',
      price: 1255,
      proteins: 80,
      type: 'bun',
      _id: '643d69a5c3f7b9001cfa093c'
    };
    const state = constructorBurger(initialState, addIngredient(bun));
    expect(state.constructorItems.bun?._id).toEqual(bun._id);
  });

  it('addIngredient for non-bun type', () => {
    const state = constructorBurger(
      initialState,
      addIngredient(mockIngredient)
    );
    expect(state.constructorItems.ingredients[0]._id).toEqual(
      mockIngredient._id
    );
  });

  it('deleteIngredient', () => {
    let state = constructorBurger(initialState, addIngredient(mockIngredient));
    state = constructorBurger(state, deleteIngredient(mockIngredient));
    expect(state.constructorItems.ingredients).not.toContainEqual(
      mockIngredient
    );
  });

  it('clearIngredients', () => {
    let state = constructorBurger(initialState, addIngredient(mockIngredient));
    state = constructorBurger(state, clearIngredients());
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });
});

describe('constructorBurger reducers перемещение', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  const ingredients=[
        {
          "_id": "643d69a5c3f7b9001cfa093c",
          "name": "Краторная булка N-200i",
          "type": "bun",
          "proteins": 80,
          "fat": 24,
          "carbohydrates": 53,
          "calories": 420,
          "price": 1255,
          "image": "https://code.s3.yandex.net/react/code/bun-02.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
          "__v": 0,
          "id":'0'
        },
        {
          "_id": "643d69a5c3f7b9001cfa0941",
          "name": "Биокотлета из марсианской Магнолии",
          "type": "main",
          "proteins": 420,
          "fat": 142,
          "carbohydrates": 242,
          "calories": 4242,
          "price": 424,
          "image": "https://code.s3.yandex.net/react/code/meat-01.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
          "__v": 0,
          "id":'1'
        },
        {
          "_id": "643d69a5c3f7b9001cfa093e",
          "name": "Филе Люминесцентного тетраодонтимформа",
          "type": "main",
          "proteins": 44,
          "fat": 26,
          "carbohydrates": 85,
          "calories": 643,
          "price": 988,
          "image": "https://code.s3.yandex.net/react/code/meat-03.png",
          "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
          "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
          "__v": 0,
          "id":'2'
        }
      ]
    
    it('ingredientMoveDown', () => {
      const stateWithIngredients = {
        ...initialState,
        constructorItems: {
          ...initialState.constructorItems,
          ingredients
        }
      };
      const nextState = constructorBurger(
        stateWithIngredients,
        ingredientMoveDown(0) 
      );
      expect(nextState.constructorItems.ingredients).toEqual([ingredients[1], ingredients[0], ingredients[2]]);
  })

  it('ingredientMoveUp', () => {
    const stateWithIngredients = {
      ...initialState,
      constructorItems: {
        ...initialState.constructorItems,
        ingredients
      }
    };
    const nextState = constructorBurger(
      stateWithIngredients,
      ingredientMoveUp(1) 
    );
    expect(nextState.constructorItems.ingredients).toEqual([ingredients[1], ingredients[0], ingredients[2]]);
})
})

describe('ConstructorBurgerSlice extraReducers', () => {
    it('ingredientsApi.pending', () => {
      const state = constructorBurger(initialState, { type: ingredientsApi.pending.type });
    expect(state.isLoading).toBe(true);
    });
  
    it('ingredientsApi.fulfilled', () => {
      const fulfilledData = {
        type: ingredientsApi.fulfilled.type,
        payload: ['ingredientOne', 'ingredientTwo']
      };
  
      const state = constructorBurger(initialState, fulfilledData);
      expect(state.isLoading).toBe(false);
      expect(state.ingredients).toEqual(fulfilledData.payload);
    });
  
    it('ingredientsApi.rejected', () => {
      const state = constructorBurger(initialState, { type: ingredientsApi.rejected.type });
      expect(state.isLoading).toBe(false);
    });
});
