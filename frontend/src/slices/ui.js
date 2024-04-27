import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'ui',
  initialState: {
    currentChannelId: '1',
    defaultChannelId: '1',
  },
  reducers: {
    setCurrentChannel(state, { payload }) {
      const { channelId } = payload;
      return {
        ...state,
        currentChannelId: channelId,
      };
    },
  },
});

export const { actions } = slice;
export default slice.reducer;
