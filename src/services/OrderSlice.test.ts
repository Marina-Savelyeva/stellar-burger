import { Order, clear, initialState, createOrder,getOrders, getOrderByNumber } from "./OrderSlice";

describe('OrderSlice reducers', () => {
  test('clear correctly', () => {
    const state = {
      order: [],
      isLoading: false,
      orderData: {
        "_id": "6638db8a97ede0001d069482",
        "status": "done",
        "name": "Флюоресцентный люминесцентный метеоритный бургер",
        "createdAt": "2024-05-06T13:30:50.147Z",
        "updatedAt": "2024-05-06T13:30:50.769Z",
        "number": 39393,
        "ingredients": ['product1', 'product2']
      }
    };
    const Newstate = Order(state, clear());
    expect(Newstate.orderData).toBeNull();
  });
});

describe('OrderSlice Extrareducers', () => {
  it('getOrders.pending', () => {
    const newState = Order(initialState, { type: getOrders.pending.type });
    expect(newState.isLoading).toBe(true);
  });

  it('getOrders.fulfilled', () => {
      const action = { type: getOrders.fulfilled.type, payload: ['order 101'] };
      const state = Order(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(action.payload);
  });

  it('getOrders.rejected', () => {
    const newState = Order(initialState, { type: getOrders.rejected.type });
    expect(newState.isLoading).toBe(false);
  });

  it('createOrder.pending', () => {
    const newState = Order(initialState, { type: createOrder.pending.type });
    expect(newState.isLoading).toBe(true);
  });

  it('createOrder.fulfilled', () => {
      const action = { type: createOrder.fulfilled.type, payload: { order: { number: '101' } } };
      const state = Order(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.orderData?.number).toBe(action.payload.order.number);
  });

  it('createOrder.rejected', () => {
    const newState = Order(initialState, { type: createOrder.rejected.type });
    expect(newState.isLoading).toBe(false);
  });

  it('getOrderByNumber.pending', () => {
    const newState = Order(initialState, { type: getOrderByNumber.pending.type });
    expect(newState.isLoading).toBe(true);
  });

  it('getOrderByNumber.fulfilled', () => {
    const action = {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: ['order101'] }
    };
    const state = Order(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.order).toEqual(action.payload.orders);
  });

  it('getOrderByNumber.rejected', () => {
    const newState = Order(initialState, { type: getOrderByNumber.rejected.type });
    expect(newState.isLoading).toBe(false);
  });
})
