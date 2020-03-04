const {buildQuery} = require('../../utils');

describe('query with no conditions', () => {
  it('should query all users', () => {
    const query = buildQuery('users', '*');
    expect(query[0]).toBe('SELECT * FROM users');
    expect(query[1]).toEqual([]);
  })

  it('should query all books', () => {
    const query = buildQuery('books', '*');
    expect(query[0]).toBe('SELECT * FROM books');
    expect(query[1]).toEqual([]);
  })

  it('should query only id and name from books', () => {
    const query = buildQuery('books', ['id', 'name']);
    expect(query[0]).toBe('SELECT id, name FROM books');
    expect(query[1]).toEqual([]);
  })
  
})

describe('query with conditions', () => {
  it('should query * from books if the book id is 5', () => {
    const query = buildQuery('books', '*', {id:5});
    expect(query[0]).toBe('SELECT * FROM books WHERE id=?');
    expect(query[1]).toEqual(['5']);
  })

  it('should query id, name and author from books if the book id is 5 and name is popo', () => {
    const query = buildQuery('books', '*', {id:5, name: 'popo'});
    expect(query[0]).toBe('SELECT * FROM books WHERE id=? AND name=?');
    expect(query[1]).toEqual(['5', 'popo']);
  })

})
