import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

class ListBooks extends Component {

  changeShelf = (item) => {
    this.props.onChangeShelf(item)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

            <BookShelf books={this.props.books} onChangeShelf={this.changeShelf} bookShelf={'Currently Reading'} bookShelfName={'currentlyReading'} />

            <BookShelf books={this.props.books} onChangeShelf={this.changeShelf} bookShelf={'Want to Read'} bookShelfName={'wantToRead'} />

            <BookShelf books={this.props.books} onChangeShelf={this.changeShelf} bookShelf={'Read'} bookShelfName={'read'} />

          </div>
        </div>
        <div className="open-search">
          <Link to='/search' className='openSearchButton'>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks;