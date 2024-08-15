import { jest } from "@jest/globals";

//Basically these mocks checks if all operations were done without actually doing them
jest.unstable_mockModule("../src/db.js", () => ({
  insertDb: jest.fn(),
  getDb: jest.fn(),
  saveDb: jest.fn(),
}));

const { insertDb, getDb, saveDb } = await import("../src/db.js");
const { newNote, getAllNotes, removeNote } = await import("../src/notes.js");

//Before running each test clear the mocks
beforeEach(() => {
  insertDb.mockClear();
  getDb.mockClear();
  saveDb.mockClear();
});

test("newNote inserts data and returns it", async () => {
  const note = "Test note";
  const tags = ["tag1", "tag2"];
  const data = {
    content: note,
    id: Date.now(),
    tags,
  };

  //When newNote() is called at line 30, this mock insertDb will execute instead of actual insertDb
  insertDb.mockResolvedValue(data);

  const result = await newNote(note, tags);
  expect(result).toEqual(data);
});

test("getAllNotes returns all the notes", async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: "note2",
      },
      {
        id: 2,
        content: "note2",
      },
      { id: 3, content: "note 3" },
    ],
  };

  //When getAllNotes is called in test, this mock getDb will run instead of actual getDb
  getDb.mockResolvedValue(data);

  const result = await getAllNotes();
  expect(result).toEqual(data.notes);
});

test("removeNote does nothing if id is not found", async () => {
  const data = {
    notes: [
      {
        id: 1,
        content: "note2",
      },
      {
        id: 2,
        content: "note2",
      },
      { id: 3, content: "note 3" },
    ],
  };
  getDb.mockResolvedValue(data);
  saveDb.mockResolvedValue(data.notes);

  const idToRemove = 4;
  const result = await removeNote(idToRemove);
  expect(result).toBeUndefined();
});
