import { Book } from "./book";
class Library {
  bookshelf = [];
  #name;

  constructor(bookList = [], libraryName = "The Great Library of Alexandria") {
    this.addBooksToLibrary(bookList); // Whatever books we start with, we put on the bookshelf.
    this.#name = libraryName;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
    const header = document.querySelector(".library-header");
    header.textContent = this.#name;
  }

  get numBooks() {
    return this.bookshelf.length;
  }

  addBooksToLibrary(bookArray) {
    for (const b of bookArray) {
      this.#addBookToLibrary(b);
    }
  }

  #addBookToLibrary(book) {
    this.bookshelf.push(book);
    this.addBookToLibraryDisplay(book);
  }

  printLibrary() {
    console.table(this.bookshelf);
  }

  static howManyBooks(lib) {
    return lib.bookshelf.length;
  }

  addBookToLibraryDisplay(book) {
    const libDOM = document.querySelector(".library");

    // Get last book in library's id:
    const lastBook = libDOM.lastChild;

    if (lastBook) {
      book.id = Number(lastBook.value) + 1;
    } else {
      book.id = 0;
    }

    // Make a .book object
    const bookDOM = document.createElement("div");
    bookDOM.classList.add("book", book.type);

    // Make the book element's inner stuff: Title, author, and other information:
    bookDOM.value = book.id;
    const titleDOM = document.createElement("h2");
    titleDOM.textContent = book.title;
    bookDOM.appendChild(titleDOM);
    const authorDOM = document.createElement("p");
    authorDOM.textContent = `by ${book.author}`;
    bookDOM.appendChild(authorDOM);

    if (book.type === "novel") {
      const extraTextDOM = document.createElement("p");
      extraTextDOM.textContent = `a novel`;
      bookDOM.appendChild(extraTextDOM);
    } else if (book.type === "nonfiction") {
      const extraTextDOM = document.createElement("p");
      extraTextDOM.textContent = `a new history`;
      bookDOM.appendChild(extraTextDOM);
    } else if (book.type === "biography") {
      const extraTextDOM = document.createElement("p");
      extraTextDOM.textContent = `a life`;
      bookDOM.appendChild(extraTextDOM);
    }

    // Add a remove button

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove Book";
    removeButton.addEventListener("click", () => {
      // Remove this book
      bookDOM.remove();
    });
    bookDOM.appendChild(removeButton);

    const readStatusIndicator = document.createElement("p");
    readStatusIndicator.textContent = "Haven't Read";
    readStatusIndicator.classList.add("read-status-indicator");

    // Read status button:
    const readButton = document.createElement("button");
    readButton.classList.add("read-button");
    readButton.textContent = "Read?";
    readButton.addEventListener("click", () => {
      // mark this book as read if unread, and unread if read
      const bookId = bookDOM.value;
      let bookIdx = this.bookshelf.findIndex(
        (element) => element.id === bookId,
      );
      const readThisBook = this.bookshelf[bookIdx].read;
      if (readThisBook) {
        this.bookshelf[bookIdx].read = false;
        readStatusIndicator.classList.remove("read");
        readStatusIndicator.textContent = "Haven't Read";
      } else {
        this.bookshelf[bookIdx].read = true;
        readStatusIndicator.classList.add("read");
        readStatusIndicator.textContent = "Read";
      }
    });

    // Read Status Text
    bookDOM.appendChild(readButton);
    bookDOM.append(readStatusIndicator);

    libDOM.appendChild(bookDOM);
  }

  createLibraryDisplay() {
    //const header = document.querySelector(".library-header");
    this.name = this.#name;

    const dialog = document.querySelector("dialog");
    const showButton = document.querySelector("dialog + button");
    const cancelButton = document.querySelector("#cancel");

    // "Show the dialog" button opens the dialog modally
    showButton.addEventListener("click", () => {
      dialog.showModal();
    });

    // "Cancel" button closes the dialog
    cancelButton.addEventListener("click", () => {
      dialog.close();

      const bookTitle = document.getElementById("add-book-title");
      const bookAuthor = document.getElementById("add-book-author");
      const selectList = document.getElementById("add-book-genre");
      bookTitle.value = "";
      bookAuthor.value = "";
      selectList.selectedIndex = 0;
    });

    // Set the Custom Validities for form submission
    const bookTitle = document.getElementById("add-book-title");
    const bookAuthor = document.getElementById("add-book-author");
    const bookGenre = document.getElementById("add-book-genre");
    const selectList = document.getElementById("add-book-genre");

    bookTitle.addEventListener("input", () => {
      // can be any A-Za-z0-9
      const regex = /\w+/;
      if (!regex.test(bookTitle.value)) {
        bookTitle.setCustomValidity(
          `Title can be only letters or numbers`,
        );
      } else {
        bookTitle.setCustomValidity("");
      }
    });

    bookAuthor.addEventListener("input", () => {
      // Author can be: 
      // any number of words that are characters, 
      //including optional dashes between words, and the
      // first letter of each word should be capitalized
      // no more than 30 total characters
      const regex = /^([ ]*[A-Za-z]+([- ][A-Za-z]+)*[ ]*)+$/;
      if (!regex.test(bookAuthor.value)) {
        bookAuthor.setCustomValidity(
          `Can be only letters separated by spaces or hyphens`,
        );
      } else {
        bookAuthor.setCustomValidity("");
      }
    });

    bookGenre.addEventListener("input", () => {


      if (bookGenre.value === 'none') {
        bookGenre.setCustomValidity(`You must choose a genre!`);
      } else {
        bookGenre.setCustomValidity("");
      }
    });

    const submitButton = document.querySelector(".submit");
    const form = document.querySelector("#add-book");

    submitButton.addEventListener("click", (event) => {
      // Get the form data and use it to make a new book
      event.preventDefault();

      if (!bookTitle.checkValidity()) {
        // this.showError();
        
        bookTitle.reportValidity();
       
      } else if (!bookAuthor.checkValidity()) {
       
        bookAuthor.reportValidity();
       

      } else if (bookGenre.value === 'none') {
        
        bookGenre.setCustomValidity(`You must choose a genre!`);
        bookGenre.reportValidity();

      } else {
        // if (!bookTitle.value || !bookAuthor.value || !bookGenre.value) {
        //   return;
        // }

        const book = new Book(
          bookTitle.value,
          bookAuthor.value,
          bookGenre.value,
        );
        this.#addBookToLibrary(book);

        bookTitle.value = "";
        bookAuthor.value = "";
        selectList.selectedIndex = 0;
        dialog.close();
      }
    });
  }


}

export { Library };
