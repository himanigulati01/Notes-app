const fs = require("fs");
const log = console.log;
const chalk = require("chalk");

const getNotes = function (notes) {
  return "notes - " + notes;
};

const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    log(chalk.green.inverse("New Note Added"));
  } else {
    log(chalk.red.inverse("Title already taken"));
  }
};

const removeNotes = (title) => {
  const notes = loadNotes();
  if (notes.length === 0) {
    return chalk.yellow.inverse("No Notes, add one first");
  }
  const isTitleExist = notes.filter((note) => note.title === title);
  if (isTitleExist.length > 0) {
    const filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);
    log(chalk.green.inverse("Note Removed"));
  } else {
    log(chalk.red.inverse("No Note Found"));
  }
};

const saveNotes = (note) => {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJson = dataBuffer.toString();
    return JSON.parse(dataJson);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  removeNotes: removeNotes,
};
