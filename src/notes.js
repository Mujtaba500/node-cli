import { getDb, saveDb, insertDb } from "./db";

// Create and save a new note
const newNote = async (note, tags) => {
  const newNote = {
    content: note,
    id: Date.now(),
    tags: tags,
  };
  const noteSaved = await insertDb(newNote);
  return noteSaved;
};

// Get all notes from db
const getAllNotes = async () => {
  const { notes } = await getDb();
  return notes;
};

// Search for notes
const findNotes = async (filter) => {
  const notes = await getAllNotes();
  const filteredNotes = notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
  return filteredNotes;
};

// remove specific note
const removeNote = async (id) => {
  const notes = await getAllNotes();
  const match = notes.find((note) => note.id === id);

  if (match) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDb({ notes: newNotes });
    return id;
  }
};

// delete all notes
const removeAll = () => {
  saveDb({ notes: [] });
};

export { newNote, getAllNotes, findNotes, removeNote, removeAll };
