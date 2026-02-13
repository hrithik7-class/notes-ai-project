import axios from "axios";

const CREATE_NOTE_URI = "/api/notes/create";
const UNLOCK_NOTE_URI = "/api/notes/unlock";
const SUMMARIZE_NOTE_URI = "/api/notes/summarize";

export const createNoteApi = async (data: {
  content: string;
  expiry: number;
}) => {
  const response = await axios.post(CREATE_NOTE_URI, data, {
    withCredentials: true, 
  });

  return response.data;
};

export const unlockNoteApi = async (data: {
  noteId: string;
  password: string;
}) => {
  const response = await axios.post(UNLOCK_NOTE_URI, data, {
    withCredentials: true, 
  });
  return response.data;
};

export const summarizeNoteApi = async (data: {
  noteId: string;
  content: string;
}) => {
  const response = await fetch(SUMMARIZE_NOTE_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to summarize");
  }

  return response.json();
};

export const getNoteApi = async (noteId: string) => {
  const response = await axios.get(
    `/api/notes/${noteId}`,
    {
      withCredentials: true, 
    }
  );

  return response.data;
};
