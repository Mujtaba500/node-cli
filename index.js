#!/usr/bin/env node

// your javascript code

const note = process.argv[2];

const newNote = {
  content: note,
  id: Date.now(),
};

console.log(newNote);
