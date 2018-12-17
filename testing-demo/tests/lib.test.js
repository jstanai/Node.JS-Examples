const lib = require('../lib')
const db = require('../db')
const mail = require('../mail')

describe('absolute', () => {
  it('should return positive number', () => {
    const result = lib.absolute(1)
    expect(result).toBe(1);
  })
  
  it('should return negative number', () => {
    const result = lib.absolute(-1)
    expect(result).toBe(1);
  })
  
  it('should return zero', () => {
    const result = lib.absolute(0)
    expect(result).toBe(0);
  })
})

describe('greet', () => {
  it('should return greet message', () => {
    const result =lib.greet('Mosh')
    expect(result).toMatch(/Mosh/)
    //expect(result).toContain('Mosh')
  })
})

describe('currencies', () => {
  it('should return supported currencies', () => {
    const result = lib.getCurrencies()

    // Too General
    //expect(result).toBeDefined()
    //expect(result).not.toBeNull()

    // Too specific
    //expect(result[0]).toBe('USD')
    //expect(result[1]).toBe('AUD')
    //expect(result[2]).toBe('EUR')
    //expect(result.length).toBe(3)

    // Proper way
    expect(result).toContain('USD')
    expect(result).toContain('AUD')
    expect(result).toContain('EUR')

    // Ideal way
    expect(result).toEqual(expect.arrayContaining(['USD', 'EUR', 'AUD']))

  })
})

describe('object', () => {
  it('should return product with given id', () => {
    const result = lib.getProduct(1);

    // object equality (too specific)
    expect(result).toEqual({ id: 1, price: 10 })

    //contains at least these props
    expect(result).toMatchObject({ id: 1, price: 10 }) 

    // Property containment
    expect(result).toHaveProperty('id', 1) 
    
  })
})

describe('register user', () => {
  it('should throw if username is falsey', () => {
    // Null, undefined, NaN, '', 0, false <--- falsy values

    const args = [null, undefined, NaN, '', 0, false]

    args.forEach( a => {
      expect(() => { lib.registerUser(a) }).toThrow()
    })

  })

  it('should return user object if valid username is passed', () => {
    const result = lib.registerUser('mosh')
    expect(result).toMatchObject({username: 'mosh'})
    expect(result.id).toBeGreaterThan(0)
  })
})

describe('apply discount function', () => {
  it('should apply discoutn if >10 points', () => {

    // fake or mock function
    db.getCustomerSync = function(customerId) {
      console.log('fake reading customer')
      return { id: customerId, points: 11 }
    }
    const order = { customerId: 1, totalPrice: 10 }

    lib.applyDiscount(order)

    expect(order.totalPrice).toBe(9)
  })
})

describe('notify customer function', () => {
  it('should send email to customer', () => {

    db.getCustomerSync = jest.fn().mockReturnValue({
      email: 'a'
    })

    // fake or mock function
    //db.getCustomerSync = function(customerId) {
    //  return { email: 'a' }
    //}

    mail.send = jest.fn()

    //let mailSent = false
    //mail.send = function(email, message) {
    //  mailSent = true
    //}
 
    lib.notifyCustomer({ customerId: 1 })

    expect(mail.send).toHaveBeenCalled()
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  })
})