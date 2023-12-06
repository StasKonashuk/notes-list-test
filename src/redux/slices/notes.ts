import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Note {
  id: number;
  text: string;
  tags: string[];
}

export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setNotes: (state, { payload }: PayloadAction<NotesState>) => {
      state.notes = payload.notes;
    },

    addNote: (state, { payload }: PayloadAction<Note>) => {
      state.notes.push(payload);
    },

    removeNote: (state, { payload }: PayloadAction<{ id: number }>) => {
      state.notes = state.notes.filter((n) => n.id !== payload.id);
    },

    editNote: (state, { payload }: PayloadAction<Note>) => {
      const updatedNotes = state.notes.map((note) => {
        if (note.id === payload.id) {
          return {
            ...payload,
          };
        }
        return note;
      });

      state.notes = updatedNotes;
    },
  },
});

export const {
  reducer: notesReducer,
  actions: { setNotes, addNote, removeNote, editNote },
} = notesSlice;
