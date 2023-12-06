import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TagsState {
  tags: string[];
}

const initialState: TagsState = {
  tags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setTags: (state, { payload }: PayloadAction<TagsState>) => {
      state.tags = payload.tags;
    },
  },
});

export const {
  reducer: tagsReducer,
  actions: { setTags },
} = tagsSlice;
