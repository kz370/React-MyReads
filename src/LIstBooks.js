import React from 'react'
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

function ListBooks(props) {

  const changeShelf = (item) => {
    props.onChangeShelf(item)
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>

          <BookShelf books={props.books} onChangeShelf={changeShelf} bookShelf={'Currently Reading'} bookShelfName={'currentlyReading'} />

          <BookShelf books={props.books} onChangeShelf={changeShelf} bookShelf={'Want to Read'} bookShelfName={'wantToRead'} />

          <BookShelf books={props.books} onChangeShelf={changeShelf} bookShelf={'Read'} bookShelfName={'read'} />

        </div>
      </div>
      <div className="open-search">
        <Link to='/search' className='openSearchButton'>Add a book</Link>
      </div>
    </div>
  )
}

export default ListBooks;