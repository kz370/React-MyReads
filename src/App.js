import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './LIstBooks'
import SearchPage from './SearchPage'
import { Route, Routes } from 'react-router-dom'

/*eslint-disable */
class BooksApp extends React.Component {
  state = {
    shelf: {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  filter = (shelf) => {
    const books = this.state.books
    return books.filter(book => book.shelf === shelf).map(book => { return book.id })
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books: books })
    this.setState({
      shelf: {
        currentlyReading: this.filter('currentlyReading'),
        wantToRead: this.filter('wantToRead'),
        read: this.filter('read')
      }
    })
  }

  changeShelf = (item) => {
    BooksAPI.update(item[0], item[1])
      .then((res) => {
        this.setState({ shelf: res });
        BooksAPI.getAll()
          .then(data => {
            this.setState({ books: data })
          })
      })
  }

  getShelf = (id) => {
    let currentShelf = 'none'
    const shelf = Object.entries(this.state.shelf)
    shelf.map(shelf => {
      if (shelf[1].includes(id)) {
        currentShelf = shelf[0]
      }
    })
    return currentShelf;

  }

  render() {
    return (
      <div className="app">
        <Routes>
          <Route
            exact path='/search'
            element={<SearchPage
              onChangeShelf={this.changeShelf}
              onGetShelf={this.getShelf} />}
          />

          <Route
            exact path='/'
            element={<ListBooks
              books={typeof this.state.books !== 'undefined' ? this.state.books : ''}
              onChangeShelf={this.changeShelf} />}
          />
        </Routes>
      </div>
    )
  }
}

export default BooksApp
