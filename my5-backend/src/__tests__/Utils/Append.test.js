const {append} = require('../../utils');

describe('test string appending with space', () => {
  it('should append two strings together', () => {
    expect(append(['string1', 'string2'])).toBe('string1 string2')
  })

  it('should trim and append two strings together', () => {
    expect(append([' first string   ', '  string with space '])).toBe('first string string with space')
  })
})

describe('test string appending with some delimiter', () => {
  it('should append two strings together with semicolon between', () => {
    expect(append(['string1', 'string2'], ';')).toBe('string1;string2')
  })

  it('should trim and append two strings together', () => {
    expect(append([' first string   ', '  string with space '], ';'))
    .toBe('first string;string with space')
  })

  it('should trim and append two strings with no space', () => {
    expect(append([' first string   ', '  string with spaces '], ''))
    .toBe('first stringstring with spaces')
  })
})