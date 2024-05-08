import { rootReducer, store } from './store';
import { expect, test, describe, jest } from '@jest/globals';

describe('тест rootReducer', () => {
  test('настройка работы', () => {
    const storeRes = rootReducer(undefined, { type: 'ACTION' });
    expect(storeRes).toEqual(store.getState()); //равен текущему состоянию хранилища (store.getState())
  });

  test('есть нужные ключи', () => {
    const storeRes = rootReducer(undefined, { type: 'ACTION' });
    expect(storeRes).toHaveProperty('constructorBurger');
    expect(storeRes).toHaveProperty('order');
    expect(storeRes).toHaveProperty('user');
    expect(storeRes).toHaveProperty('feed');
  });
});
