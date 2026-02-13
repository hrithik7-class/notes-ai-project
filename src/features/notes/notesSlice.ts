import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createNoteApi,
  unlockNoteApi,
  summarizeNoteApi,
  getNoteApi,
} from "./notesApi";
import { NotesState } from "./notesTypes";


export const createNote = createAsyncThunk<
  { url: string; pass: string },
  { content: string; expiry: number },
  { rejectValue: string }
>("notes/create", async (data, { rejectWithValue }) => {
  try {
    return await createNoteApi(data);
  } catch (err) {
    const axiosErr = err as { response?: { data?: { error?: string } } };
    const message =
      axiosErr?.response?.data?.error || "Failed to create note";
    return rejectWithValue(message);
  }
});

export const unlockNote = createAsyncThunk<
  { message: string },
  { noteId: string; password: string },
  { rejectValue: string }
>("notes/unlock", async (data, { rejectWithValue }) => {
  try {
    return await unlockNoteApi(data);
  } catch (err) {
    const axiosErr = err as { response?: { data?: { error?: string } } };
    const message =
      axiosErr?.response?.data?.error || "Invalid password";
    return rejectWithValue(message);
  }
});

export const summarizeNote = createAsyncThunk<
  string,
  { noteId: string; content: string },
  { rejectValue: string }
>("notes/summarize", async (data, { rejectWithValue }) => {
  try {
    const res = await summarizeNoteApi(data);
    return res.summary;
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to summarize";
    return rejectWithValue(message);
  }
});

export const getNote = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("notes/getNote", async (noteId, { rejectWithValue }) => {
  try {
    const res = await getNoteApi(noteId);
    return res.content;
  } catch (err) {
    const axiosErr = err as { response?: { data?: { error?: string } } };
    const message =
      axiosErr?.response?.data?.error || "Failed to fetch note";
    return rejectWithValue(message);
  }
});

const initialState: NotesState = {
  result: null,
  summary: null,
  content: null,

  isCreating: false,
  isUnlocking: false,
  isSummarizing: false,
  isFetching: false,

  error: null,
  authError: null, // ⭐ NEW
};

const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    clearNoteState(state) {
      state.result = null;
      state.summary = null;
      state.content = null;
      state.error = null;
      state.authError = null;
    },
    clearAuthError(state) {
      state.authError = null;
    },
  },

  extraReducers: (builder) => {
    // CREATE
    builder
      .addCase(createNote.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isCreating = false;
        state.result = action.payload;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload as string;
      });

    // UNLOCK
    builder
      .addCase(unlockNote.pending, (state) => {
        state.isUnlocking = true;
        state.authError = null;
      })
      .addCase(unlockNote.fulfilled, (state) => {
        state.isUnlocking = false;
        state.authError = null; // clear old errors
      })
      .addCase(unlockNote.rejected, (state, action) => {
        state.isUnlocking = false;
        state.authError = action.payload as string;
      });

    builder
      .addCase(getNote.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getNote.fulfilled, (state, action) => {
        state.isFetching = false;
        state.content = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.isFetching = false;
        state.content = null;
        state.authError = action.payload as string;
      });



    // SUMMARIZE
    builder
      .addCase(summarizeNote.pending, (state) => {
        state.isSummarizing = true;
      })
      .addCase(summarizeNote.fulfilled, (state, action) => {
        state.isSummarizing = false;
        state.summary = action.payload;
      })
      .addCase(summarizeNote.rejected, (state, action) => {
        state.isSummarizing = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearNoteState, clearAuthError } = notesSlice.actions;
export default notesSlice.reducer;
