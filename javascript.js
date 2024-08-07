const myLibrary = [];

function Book(title, author, type) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.type = type; // 'novel', 'biography', 'non-fiction'
  this.id = null;
  this.read = false;
  this.pages = null;
}

function addBookToLibraryArray(book) {
  myLibrary.push(book);
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("#cancel");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();

  const bookTitle = document.getElementById("add-book-title");
  const bookAuthor = document.getElementById("add-book-author");
  const selectList = document.getElementById("add-book-genre");
  bookTitle.value = "";
  bookAuthor.value = "";
  selectList.selectedIndex = 0;
});

// make new book add form.
submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (event) => {
  // Get the form data and use it to make a new book

  event.preventDefault();
  const bookTitle = document.getElementById("add-book-title");
  const bookAuthor = document.getElementById("add-book-author");
  const bookGenre = document.getElementById("add-book-genre");
  const selectList = document.getElementById("add-book-genre");

  if (!bookTitle.value || !bookAuthor.value || !bookGenre.value) {
    return;
  }

  const book = new Book(bookTitle.value, bookAuthor.value, bookGenre.value);
  addBookToLibrary(book)

  bookTitle.value = "";
  bookAuthor.value = "";
  selectList.selectedIndex = 0;
  dialog.close();
})



function addBookToLibraryDisplay(book) {
  const libDOM = document.querySelector(".library");

  // Get last book in library's id: 
  const lastBook = libDOM.lastChild;

  if (lastBook) {
    book.id = Number(lastBook.value) + 1;
  } else {
    book.id = 0;
  }


  // for (const b of library){
  //     displayText += b.title + ", ";
  // }
  // libDOM.textContent = displayText;



  // Give each book a unique id, to help find it later.

  // Make a .book object
  const bookDOM = document.createElement('div');
  bookDOM.classList.add('book', book.type);

  // Make the book element's inner stuff: Title, author, and other information:
  bookDOM.value = book.id;
  const titleDOM = document.createElement('h2');
  titleDOM.textContent = book.title;
  bookDOM.appendChild(titleDOM);
  const authorDOM = document.createElement('p');
  authorDOM.textContent = `by ${book.author}`;
  bookDOM.appendChild(authorDOM);

  if (book.type === 'novel') {
    const extraTextDOM = document.createElement('p');
    extraTextDOM.textContent = `a novel`;
    bookDOM.appendChild(extraTextDOM);
  } else if (book.type === 'nonfiction') {
    const extraTextDOM = document.createElement('p');
    extraTextDOM.textContent = `a new history`;
    bookDOM.appendChild(extraTextDOM);
  } else if (book.type === 'biography') {
    const extraTextDOM = document.createElement('p');
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
  })
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
    let bookIdx = myLibrary.findIndex((element)=> element.id === bookId);
    const readThisBook = myLibrary[bookIdx].read;
    if (readThisBook){
      myLibrary[bookIdx].read = false;
      readStatusIndicator.classList.remove("read");
      readStatusIndicator.textContent = "Haven't Read";
    } else {
      myLibrary[bookIdx].read = true;
      readStatusIndicator.classList.add("read");
      readStatusIndicator.textContent = "Read";
    }
    
  })
  

    // Read Status Text


  bookDOM.appendChild(readButton);
  bookDOM.append(readStatusIndicator);

  libDOM.appendChild(bookDOM);





}

function addBookToLibrary(book) {
  addBookToLibraryArray(book);
  addBookToLibraryDisplay(book);
}

// Make a table: 
// Title:
//  title 1
//  title 2

// Main Code

const bookList = [new Book('A nonfiction book', "Hoop Gob", 'nonfiction'),
new Book('The Sea Peoples', 'Hershodotus', 'nonfiction'),
new Book('Alexander the Great', 'Hershodotus', 'biography'),
new Book('The Sea Peoples', 'Hershodotus', 'nonfiction'),
new Book('Winston Churchill', 'Hershodotus', 'biography'),
new Book('The Great Bob Gobbler', "Hoop Gob", 'novel')];


for (const b of bookList){
  addBookToLibrary(b);
}

// addBookToLibrary()
// addBookToLibrary()
// addBookToLibrary()
// addBookToLibrary()
// addBookToLibrary();
// addBookToLibrary(new Book('The Great Bob Gobbler', "Hoop Gob", 'nonfiction'));


// refreshLibraryOnPage(myLibrary);

