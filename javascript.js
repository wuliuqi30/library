const myLibrary = [];

function Book(title, author, type) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.type = type; // 'novel', 'biography', 'non-fiction'
  this.id = null;
}

function addBookToLibraryArray(book) {
  myLibrary.push(book);
}

// make new book add form.
submitButton = document.querySelector(".submit");
submitButton.addEventListener("click", (event) => {
  // Get the form data and use it to make a new book
  
  event.preventDefault();
  const bookTitle = document.getElementById("add-book-title");
  const bookAuthor = document.getElementById("add-book-author");
  const bookGenre = document.getElementById("add-book-genre");
  const book = new Book(bookTitle.value, bookAuthor.value, bookGenre.value);
  addBookToLibraryArray(book);
  addBookToLibraryDisplay(book);
})

function addBookToLibraryDisplay(book) {
  const libDOM = document.querySelector(".library");

  // Get last book in library's id: 
  const lastBook = libDOM.lastChild;

  if (lastBook){
    book.id = Number(lastBook.value) + 1;
  } else{
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
    authorDOM.textContent = `by ${book.author}, id ${book.id}`;
    bookDOM.appendChild(authorDOM);

    if (book.type === 'novel') {
      const extraTextDOM = document.createElement('p');
      extraTextDOM.textContent = `a novel`;
      bookDOM.appendChild(extraTextDOM);
    }
    libDOM.appendChild(bookDOM);


  


}

// Make a table: 
// Title:
//  title 1
//  title 2

// Main Code

// addBookToLibrary(new Book('A nonfiction book', "Hoop Gob", 'nonfiction'));
// addBookToLibrary(new Book('The Sea Peoples', 'Hershodotus', 'nonfiction'))
// addBookToLibrary(new Book('Alexander the Great', 'Hershodotus', 'biography'))
// addBookToLibrary(new Book('The Sea Peoples', 'Hershodotus', 'nonfiction'))
// addBookToLibrary(new Book('Winston Churchill', 'Hershodotus', 'biography'))
// addBookToLibrary(new Book('The Great Bob Gobbler', "Hoop Gob", 'novel'));
// addBookToLibrary(new Book('The Great Bob Gobbler', "Hoop Gob", 'nonfiction'));


// refreshLibraryOnPage(myLibrary);