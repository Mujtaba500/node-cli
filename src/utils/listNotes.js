const listNotes = (notes) => {
  notes.forEach(({ id, content, tags }) => {
    console.log("id: ", id);
    console.log("content: ", content);
    console.log("tags: ", tags);
    console.log("\n");
  });
};

export default listNotes;
