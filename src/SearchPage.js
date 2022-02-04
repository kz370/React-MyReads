import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'

/*eslint-disable */
class SearchPage extends Component {
  state = {
    query: ''
  }
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books: books })
  }

  onSearch = (event) => {
    const query = event.target.value;
    this.setState({ query: query })
    if (query === '') {
      BooksAPI.getAll()
        .then(data => this.setState({ books: data }))
    } else {
      BooksAPI.search(query)
        .then(data => {
          data.length ? this.setState({ books: data }) : this.setState({ books: [] })
        });
    }
  }

  changeShelf = (bookId, event) => {
    const newShelf = event.target.value
    this.props.onChangeShelf([bookId, newShelf])
  }

  getShelf = (id) => {
    return this.props.onGetShelf(id)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className='close-search'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onSearch} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {typeof this.state.books !== "undefined" ? Object.entries(this.state.books).map((book) => {
              if (book[1].imageLinks && book[1].title) {
                const shelf = this.getShelf(book[1].id)
                try {
                  return (
                    <li key={book[1].id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book[1].imageLinks.thumbnail}")` }}></div>
                          <div className="book-shelf-changer">
                            <select value={shelf} onChange={() => this.changeShelf(book[1], event)}>
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
}
export default SearchPage;