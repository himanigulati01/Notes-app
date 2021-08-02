const notes = require("./notes");
const yargs = require("yargs");
const log = console.log;

//Create Add Command
yargs.command({
  command: "add",
  describe: "Adding a note",
  builder: {
    title: {
      describe: "Note Title",
      type: "string",
      demandOption: true, //for compulsory title
    },
    body: {
      describe: "Note Body",
      type: "string",
      demandOption: true,
    },
  },
  handler(argv) {
    log(notes.addNotes(argv.title, argv.body));
  },
});

//Create Remove Command
yargs.command({
  command: "remove",
  describe: "Removing a note",
  builder: {
    title: {
      describe: "Remove Note with this title",
      type: "string",
      demandOption: "true",
    },
  },
  handler(argv) {
    log(notes.removeNotes(argv.title));
  },
});

//Create list Command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    log(notes.listNotes());
  },
});

//Create Read Command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Read a note",
      type: "string",
      demandOption: "true",
    },
  },
  handler(argv) {
    log(notes.readNote(argv.title));
  },
});

yargs.parse();
