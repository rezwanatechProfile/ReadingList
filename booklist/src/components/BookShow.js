// BookShow
import React from 'react'
import { useState } from 'react'
import BookEdit from './BookEdit'
import useBooksContext from '../hooks/use-books-context';

function BookShow({ book }) {

  const [showEdit, setShowEdit] = useState(false)
  const { deleteBookById  } = useBooksContext()

  const handleDelete = (id) => {
    deleteBookById(book.id);
  }

  const handleEdit = () => {
    setShowEdit(!showEdit)
   }

  const handleSubmit = () =>{
    setShowEdit(false)
  }




  let content = <h3>{book.title}</h3>
  if(showEdit) {
    content = <BookEdit book={book} onSubmit={handleSubmit}/>
  }


  return (
    <div className='book-show'>
      <img src={`https://picsum.photos/seed/${book.id}/300/200`} alt='books'></img>
      <div>{content}</div>
      <div className='actions'>
        <button className='edit' onClick={handleEdit}>Edit</button>
        <button className='delete' onClick={handleDelete}>Delete</button>
      </div>
    </div>
  )
}

export default BookShow
