import {
  calculateModulo10,
  calculateModulo11Arrecadacao,
  calculateModulo11Bancario,
} from '../modulo'

describe('calculateModulo10', () => {
  it('should return the correct modulo 10 checksum', () => {
    expect(calculateModulo10('1234567890')).toBe(3)
    expect(calculateModulo10('0000000000')).toBe(0)
  })
})

describe('calculateModulo11Bancario', () => {
  it('should return the correct modulo 11 bancario checksum', () => {
    expect(calculateModulo11Bancario('1234567890')).toBe(1)
    expect(calculateModulo11Bancario('0000000000')).toBe(1)
    expect(calculateModulo11Bancario('1112931290')).toBe(3)
  })
})

describe('calculateModulo11Arrecadacao', () => {
  it('should return the correct modulo 11 arrecadacao checksum', () => {
    expect(calculateModulo11Arrecadacao('1234567891')).toBe(9)
    expect(calculateModulo11Arrecadacao('0000000000')).toBe(0)
    expect(calculateModulo11Arrecadacao('1111111111')).toBe(6)
    expect(calculateModulo11Arrecadacao('0102938413')).toBe(1)
  })
})
