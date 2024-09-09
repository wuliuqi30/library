// Main Code
import "./styles.css";
import { Library } from "./library";
import { Book } from "./book";

const myLibrary = new Library([], "Hersh's Library");

const bookList = [
  new Book("A nonfiction book", "Hoop Gob", "nonfiction"),
  new Book("Alexander the Great", "Hershodotus", "biography"),
  new Book("The Great Bob Gobbler", "Hoop Gob", "novel"),
];

myLibrary.addBooksToLibrary(bookList);

myLibrary.createLibraryDisplay();

console.log(myLibrary.name);
