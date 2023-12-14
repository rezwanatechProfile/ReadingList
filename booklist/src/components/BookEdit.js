import React, {useState} from 'react'

function BookEdit({ book, onSubmit}) {

  const [title, setTitle] = useState(book.title)

  const handleChange = (event) => {
    setTitle(event.target.value)

  }


  const handleSubmit = (event) => {
    event.preventDefault();
    const editedTitle = onSubmit(book.id, title)
    setTitle(editedTitle)
  }



  return (
    <form onSubmit={handleSubmit} className='book-edit'>
      <input className='input' value={title} onChange={handleChange}/>
      <button className='button is-primary'>
        Save
      </button>

    </form>
  )
}

export default BookEdit
