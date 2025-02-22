document.addEventListener('DOMContentLoaded', function () {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const bookForm = document.getElementById('bookForm');
    const searchForm = document.getElementById('searchBook');
    const incompleteBookshelf = document.getElementById('incompleteBookList');
    const completeBookshelf = document.getElementById('completeBookList');

    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }

    function renderBooks() {
        incompleteBookshelf.innerHTML = '';
        completeBookshelf.innerHTML = '';
        books.forEach(book => {
            const bookElement = createBookElement(book);
            if (book.isComplete) {
                completeBookshelf.appendChild(bookElement);
            } else {
                incompleteBookshelf.appendChild(bookElement);
            }
        });
    }

    function createBookElement(book) {
        const bookDiv = document.createElement('div');
        bookDiv.setAttribute('data-bookid', book.id);
        bookDiv.setAttribute('data-testid', 'bookItem');
        
        const title = document.createElement('h3');
        title.setAttribute('data-testid', 'bookItemTitle');
        title.innerText = book.title;
        
        const author = document.createElement('p');
        author.setAttribute('data-testid', 'bookItemAuthor');
        author.innerText = `Penulis: ${book.author}`;
        
        const year = document.createElement('p');
        year.setAttribute('data-testid', 'bookItemYear');
        year.innerText = `Tahun: ${book.year}`;
        
        const buttonContainer = document.createElement('div');
        
        const toggleButton = document.createElement('button');
        toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        toggleButton.innerText = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
        toggleButton.addEventListener('click', function () {
            book.isComplete = !book.isComplete;
            saveBooks();
            renderBooks();
        });
        
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.innerText = 'Hapus buku';
        deleteButton.addEventListener('click', function () {
            const index = books.findIndex(b => b.id === book.id);
            books.splice(index, 1);
            saveBooks();
            renderBooks();
        });

        buttonContainer.appendChild(toggleButton);
        buttonContainer.appendChild(deleteButton);
        
        bookDiv.appendChild(title);
        bookDiv.appendChild(author);
        bookDiv.appendChild(year);
        bookDiv.appendChild(buttonContainer);
        
        return bookDiv;
    }

    bookForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('bookFormTitle').value;
        const author = document.getElementById('bookFormAuthor').value;
        const year = Number(document.getElementById('bookFormYear').value);
        const isComplete = document.getElementById('bookFormIsComplete').checked;
        
        const newBook = {
            id: new Date().getTime(),
            title,
            author,
            year,
            isComplete
        };
        
        books.push(newBook);
        saveBooks();
        renderBooks();
        bookForm.reset();
    });

    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const query = document.getElementById('searchBookTitle').value.toLowerCase();
        
        document.querySelectorAll('[data-testid="bookItem"]').forEach(bookElement => {
            const title = bookElement.querySelector('[data-testid="bookItemTitle"]').innerText.toLowerCase();
            bookElement.style.display = title.includes(query) ? '' : 'none';
        });
    });

    renderBooks();
});
