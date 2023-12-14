
// import './App.css';
import React, { useState, useEffect} from 'react'
import BookCreate from './components/BookCreate';
import BookList from './components/BookList'
import axios from 'axios'


function App() {

  const [books, setBooks] = useState([])


// GET all the book list

  const fetchBooks = async () => {
    const response = await axios.get('http://localhost:3001/books')
    setBooks(response.data)
  }

  useEffect(() => {
    fetchBooks()
  }, [])




  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id
    })

    setBooks(updatedBooks)

  }

  const editBookById = (id, newTitle) => {

    const updatedBooks = books.map((book) => {
      if (book.id === id){
        return {...book, title: newTitle}

      }
      return book
    })
    setBooks(updatedBooks)

}


  const createBook = async (title) => {

     const response = await axios.post('http://localhost:3001/books', {
      title: title
     })
//creation of the books
    const updatedBooks = [
      ...books,
      response.data
    ]
    setBooks(updatedBooks)
  }




  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookCreate onCreate={createBook}/>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById}/>
    </div>
  );
}

export default App;
