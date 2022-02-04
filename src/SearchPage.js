import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

/*eslint-disable */
function SearchPage (props) {
  const [query, setQuery] = useState('')
  const [books,setBooks] = useState([])

  useEffect(() => {
    async function setBooks() { 
      const bookList = await BooksAPI.getAll();
      setBooks(bookList)
     }
  })
    
  const onSearch = (event) => {
    const queryInput = event.target.value;
    setQuery(queryInput)
    if (query === '') {
      BooksAPI.getAll()
        .then(data => setBooks(data))
    } else {
      BooksAPI.search(query)
        .then(data => {
          data.length ? setBooks(data) : setBooks([])
        });
    }
  }

  const changeShelf = (bookId, event) => {
    const newShelf = event.target.value
    props.onChangeShelf([bookId, newShelf])
  }

  const getShelf = (id) => {
    return props.onGetShelf(id)
  }
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={query} onChange={onSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof books !== "undefined" ? Object.entries(books).map((book) => {
              if (book[1].imageLinks && book[1].title) {
                const shelf = getShelf(book[1].id)
                try {
                  return (
                    <li key={book[1].id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book[1].imageLinks.thumbnail}")` }}></div>
                          <div className="book-shelf-changer">
                            <select value={shelf} onChange={() => changeShelf(book[1], event)}>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book[1].title}</div>
                        <div className="book-authors">{book[1].authors}</div>
                      </div>
                    </li>
                  )
                } catch (err) {
                  console.log(err);
                }
              }
            }) : ''}
          </ol>
        </div>
      </div>
    )
  }
export default SearchPage;