const lib = require('../exercise1')

describe('fizzbuzz', () => {
  it('should throw if input not number', () => {
    expect(() => {lib.fizzBuzz('a')}).toThrow()
    // ...
  })

  it('should return fizzbuzz', () => {
    const result = lib.fizzBuzz(15)
    expect(result).toBe('FizzBuzz')
  })

  it('should return fizz', () => {
    const result = lib.fizzBuzz(6)
    expect(result).toBe('Fizz')
  })

  it('should return buzz', () => {
    const result = lib.fizzBuzz(10)
    expect(result).toBe('Buzz')
  })

  it('should return input', () => {
    const result = lib.fizzBuzz(1)
    expect(result).toBe(1)
  })

})