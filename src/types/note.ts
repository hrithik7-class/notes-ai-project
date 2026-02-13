
export interface Note {
  id: string;
  content: string;
  passwordHash: string;
  createdAt: string;
  expiresAt?: string;
}

export interface CreateNoteResponse {
  id: string;
  shareUrl: string;
  password: string;
}

export interface UnlockResponse {
  success: boolean;
  content?: string;
  error?: string;
}

export interface SummaryResponse {
  summary: string;
}
