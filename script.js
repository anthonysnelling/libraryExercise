let myLibrary = [];
const addButton = document.querySelector("#addButton");
const mainContainer = document.querySelector("#mainContainer");

addButton.addEventListener("click", addBookToLibrary);

function Book(name, author, numOfPages, haveRead) {
  this.name = name;
  this.author = author;
  this.numOfPages = numOfPages;
  this.haveRead = haveRead;
}

function addBookToLibrary() {
  let readVal = document.getElementById("haveRead");
  let readValStr = readVal.options[readVal.selectedIndex].text;
  let notInLibrary = true;

  let newBook = new Book(
    document.getElementById("name").value,
    document.getElementById("author").value,
    document.getElementById("numberOfPages").value,
    readValStr
  );

  if (newBook.name.trim() == "" || newBook.name.length == 0) {
    alert("You didn't put a title!");
  } else if (newBook.author.trim() == "" || newBook.author.length == 0) {
    alert("You didn't put a author!");
  } else if (
    newBook.numOfPages.trim() == "" ||
    newBook.numOfPages.length == 0
  ) {
    alert("You didn't put a number of pages!");
  } else {
    for (const book in myLibrary) {
      if (myLibrary[book].name == newBook.name) {
        notInLibrary = false;
      }
    }
  }

  if (notInLibrary == true) {
    myLibrary.push(newBook);
    displayLibrary();
  } else {
    alert("Book is already in library!");
  }
}

function displayLibrary() {
  while (mainContainer.hasChildNodes()) {
    mainContainer.lastChild.remove();
  }

  for (let index = 0; index < myLibrary.length; index++) {
    let divElem = document.createElement("div");
    divElem.classList.add("bookCard");

    let bookName = document.createElement("p");
    bookName.innerText = myLibrary[index].name;
    let bookAuthor = document.createElement("p");
    bookAuthor.innerText = myLibrary[index].author;
    let bookNumOfPages = document.createElement("p");
    bookNumOfPages.innerText = myLibrary[index].numOfPages;
    let bookHaveRead = document.createElement("p");
    bookHaveRead.innerText = myLibrary[index].haveRead;

    let removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.innerText = "Remove";
    removeButton.myParam = myLibrary[index].name;
    removeButton.addEventListener("click", removeBook);
    
    let readStatusButton = document.createElement("button");
    readStatusButton.type = "button";
    readStatusButton.innerText = "Read Status";
    readStatusButton.nameParam = myLibrary[index].name;
    readStatusButton.readParam = myLibrary[index].haveRead;
    readStatusButton.addEventListener("click", toggleReadStatus);

    divElem.appendChild(bookName);
    divElem.appendChild(bookAuthor);
    divElem.appendChild(bookNumOfPages);
    divElem.appendChild(bookHaveRead);
    divElem.appendChild(removeButton);
    divElem.appendChild(readStatusButton);

    mainContainer.appendChild(divElem);
  }
}

//TODO: Write a way to toggle the read status of a book probably keep track of the index in the object and then delete
function toggleReadStatus(book) {
  for (const entry in myLibrary) {
    if (myLibrary[entry].name == book.target.nameParam) {
      if (book.target.readParam == "Read") {
        myLibrary[entry].haveRead = "Not Read";
      } else {
        myLibrary[entry].haveRead = "Read";
      }
    }
  }
  displayLibrary();
}

function removeBook(book) {
  // alert(book.target.myParam);
  for (const entry in myLibrary) {
    if (myLibrary[entry].name == book.target.myParam) {
      myLibrary.splice(entry, 1);
    }
  }

  book.target.parentNode.remove();
  displayLibrary();
}

function printLibrary() {
  for (const entry in myLibrary) {
    console.log(myLibrary[entry]);
  }
}
