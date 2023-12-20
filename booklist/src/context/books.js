
// books.js 
import { createContext, useState } from "react";
import axios from 'axios'

const BooksContext = createContext();

function Provider({ children }) {

  const [books, setBooks] = useState([]);

  // GET all the book list
  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };

  const deleteBookById = async (id) => {

    await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });

    setBooks(updatedBooks);
  };

  // UPDATE BOOKS
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  // CREATE BOOKS
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title: title,
    });
    //creation of the books
    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };


  const valueToShare = {

    books: books,
    createBook: createBook,
    editBookById: editBookById,
    deleteBookById: deleteBookById,
    fetchBooks: fetchBooks,

  }


  return <BooksContext.Provider value={valueToShare}>{children}</BooksContext.Provider>;
}

export { Provider };
export default BooksContext;
