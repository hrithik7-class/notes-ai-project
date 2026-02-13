export interface NoteResult {
  url: string;
  pass: string;
}


export interface NotesState {
  result: NoteResult | null;
  summary: string | null;

  content: string | null; 

  isCreating: boolean;
  isSummarizing: boolean;
  isUnlocking: boolean;

  isFetching: boolean; 
  authError: string | null;
  error: string | null;
}

