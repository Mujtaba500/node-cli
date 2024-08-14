import fs from "fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url).pathname;

// Get data from dataBase
const getDb = async () => {
  const data = JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  return data;
};

// Save data in dataBase
const saveDb = async (data) => {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  return data;
};

const insertDb = async (note) => {
  const db = await getDb();
  db.notes.push(note);
  await saveDb(db);
  return note;
};

export { getDb, saveDb, insertDb };
