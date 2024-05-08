import { feed, feedsApi, initialState } from '../services/FeedSlice';
import { expect, test, describe, jest } from '@jest/globals';

describe('FeedSlice extraReducers', () => {
  test('feedsApi.pending', () => {
    const state = feed(initialState, { type: feedsApi.pending.type });
    expect(state.isLoading).toBe(true);
  });

  test('feedsApi.fulfilled ', () => {
    const mockPayload = {
      orders: ['order1', 'order11'],
      total: 10,
      totalToday: 10
    };
    const state = feed(initialState, {
      type: feedsApi.fulfilled.type,
      payload: mockPayload
    });
    expect(state.isLoading).toBe(false);
    expect(state.feeds).toEqual(mockPayload.orders);
    expect(state.total).toBe(mockPayload.total);
    expect(state.todayTotal).toBe(mockPayload.totalToday);
  });

  test('feedsApi.rejected correctly', () => {
    const state = feed(initialState, { type: feedsApi.rejected.type });
    expect(state.isLoading).toBe(false);
  });
});
