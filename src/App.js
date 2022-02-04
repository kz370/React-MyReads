import React, { useState, useEffect } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './LIstBooks'
import SearchPage from './SearchPage'
import { Route, Routes } from 'react-router-dom'

/*eslint-disable */
function BooksApp() {
  const [shelf, setShelf] = useState({
    currentlyReading: [],
    wantToRead: [],
    read: []
  })
  const [books, setBooks] = useState([])


  const filter = (shelf) => {
    return books.filter(book => book.shelf === shelf).map(book => { return book.id })
  }

  useEffect(() => {
    async function fetchBooks() {
      try {
        const bookList = await BooksAPI.getAll();
        setBooks(bookList)
        setShelf({
          currentlyReading: filter('currentlyReading'),
          wantToRead: filter('wantToRead'),
          read: filter('read')
        })
      } catch (e) {
        console.log(e);
      }
    }
    fetchBooks()
  });

  const changeShelf = (item) => {
    BooksAPI.update(item[0], item[1])
      .then((res) => {
        setShelf(res)
        BooksAPI.getAll()
          .then(data => {
            setBooks(data)
          })
      })
  }

  const getShelf = (id) => {
    let currentShelf = 'none'
    Object.entries(shelf).map(shelf => {
      if (shelf[1].includes(id)) {
        currentShelf = shelf[0]
      }
    })
    return currentShelf;

  }
  return (
    <div className="app">
      <Routes>
        <Route
          exact path='/search'
          element={<SearchPage
            onChangeShelf={changeShelf}
            onGetShelf={getShelf} />}
        />

        <Route
          exact path='/'
          element={<ListBooks
            books={typeof books !== 'undefined' ? books : ''}
            onChangeShelf={changeShelf} />}
        />
      </Routes>
    </div>
  )
}

export default BooksApp
