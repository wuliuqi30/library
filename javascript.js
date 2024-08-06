const myLibrary = [];

function Book(title,author,type) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.type = type; // 'novel', 'biography', 'non-fiction'
  this.id = null;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  console.log(myLibrary);
}

function displayLibraryOnPage(library){
    const libDOM = document.querySelector(".library");
    let displayText = "This library's books are: ";
    // for (const b of library){
    //     displayText += b.title + ", ";
    // }
    // libDOM.textContent = displayText;

    for (let b = 0; b < library.length; b++){

      let book = library[b];
      // Give each book a unique id, to help find it later.
      book.id = b;
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

      if (book.type === 'novel'){
        const extraTextDOM = document.createElement('p');
        extraTextDOM.textContent = `a novel`;
        bookDOM.appendChild(extraTextDOM);
      } 
      libDOM.appendChild(bookDOM);


    }

    
}

// Make a table: 
// Title:
//  title 1
//  title 2

// Main Code

addBookToLibrary(new Book('A nonfiction book',"Hoop Gob",'nonfiction'));
addBookToLibrary(new Book('The Sea Peoples','Hershodotus','nonfiction'))
addBookToLibrary(new Book('Alexander the Great','Hershodotus','biography'))
addBookToLibrary(new Book('The Sea Peoples','Hershodotus','nonfiction'))
addBookToLibrary(new Book('Winston Churchill','Hershodotus','biography'))
addBookToLibrary(new Book('The Great Bob Gobbler',"Hoop Gob",'novel'));
addBookToLibrary(new Book('The Great Bob Gobbler',"Hoop Gob",'nonfiction'));


displayLibraryOnPage(myLibrary);