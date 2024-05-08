import {user, userLogOut, initialState, logIn,logOut, userProfile, updateUserProfile } from '../services/UserSlice';

describe('UserSlice reducers', () => {
  test('userLogOut correctly', () => {
    const initialState = {
      profileUser: { name: 'Marina', email: 'mar.sav.18@yandex.ru' },
      isAuth: true
    };
    const newState = user(initialState, userLogOut());
    expect(newState.profileUser.name).toBe('');
    expect(newState.profileUser.email).toBe('');
    expect(newState.isAuth).toBe(false);
  });
});

describe('UserSlice Extrareducers', () => {
  it('logIn.pending ', () => {
    const newState = user(initialState, { type: logIn.pending.type });
    expect(newState.isAuth).toBe(false);
  });

  it('logIn.fulfilled', () => {
    const fulfilledAction = {
      type: logIn.fulfilled.type,
      payload: { user: { name: 'Marina', email: 'mar.sav.18@yandex.ru' } }
    };
    const state = user(initialState, fulfilledAction);
    expect(state.isAuth).toBe(true);
    expect(state.profileUser).toBe(fulfilledAction.payload.user);
  });

  it('logIn.rejected', () => {
    const newState = user(initialState, { type: logIn.pending.type });
    expect(newState.isAuth).toBe(false);
  });

  it('logOut.pending', () => {
    const pendingAction = {
      type: logOut.pending.type,
      payload: { user: { name: 'Marina', email: 'mar.sav.18@yandex.ru' } }
    };
    const state = user(initialState, pendingAction);
    expect(state.isAuth).toBe(true);
  });

  it('logOut.fulfilled', () => {
    const fulfilledAction = {
      type: logOut.fulfilled.type,
      payload: { user: { name: '', email: ''} }
    };
    const state = user(initialState, fulfilledAction);
    expect(state.isAuth).toBe(false);
    expect(state.profileUser).toEqual(fulfilledAction.payload.user);
  });  

  it('logOut.rejected', () => {
    const state = user(initialState, { type: logOut.rejected.type });
    expect(state.isAuth).toBe(false);
  });

  it('updateUserProfile.pending', () => {
    const state = user(initialState, { type: updateUserProfile.pending.type });
    expect(state.isAuth).toBe(true);
  });

  it('updateUserProfile.fulfilled', () => {
      const state = user(initialState, {
          type: updateUserProfile.fulfilled.type,
          payload: { user: { name: 'user', email: 'email@gmail.ru' } }
      });
      expect(state.isAuth).toBe(true);
      expect(state.profileUser).toEqual({ name: 'user', email: 'email@gmail.ru' });
  });

  it('userProfile.pending', () => {
    const state = user(initialState, { type: userProfile.pending.type });
    expect(state.isAuth).toBe(false);
  });

  it('userProfile.fulfilled', () => {
      const state = user(initialState, {
          type: userProfile.fulfilled.type,
          payload: { user: { name: 'user', email: 'email@gmail.ru' } }
      });
      expect(state.isAuth).toBe(true);
      expect(state.profileUser).toEqual({ name: 'user', email: 'email@gmail.ru' });
  });

  it('userProfile.rejected', () => {
    const state = user(initialState, { type: userProfile.rejected.type });
    expect(state.isAuth).toBe(false);
  });

});
