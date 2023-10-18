export function calculateModulo10(block: string): number {
  const digits = block.split('').reverse()
  const sum = digits.reduce((acc, current, index) => {
    let product = Number(current) * (((index + 1) % 2) + 1)
    product = product > 9 ? Math.trunc(product / 10) + (product % 10) : product
    return acc + product
  }, 0)
  return Math.ceil(sum / 10) * 10 - sum
}

export function calculateModulo11Bancario(block: string): number {
  const digits = block.split('').reverse()
  let multiplier = 2
  const sum = digits.reduce((acc, current) => {
    const product = Number(current) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
    return acc + product
  }, 0)
  const remainder = sum % 11
  const DV = 11 - remainder
  if (DV === 0 || DV === 10 || DV === 11) return 1
  return DV
}

export function calculateModulo11Arrecadacao(block: string): number {
  const digits = block.split('').reverse()
  let multiplier = 2
  const sum = digits.reduce((acc, current) => {
    const product = Number(current) * multiplier
    multiplier = multiplier === 9 ? 2 : multiplier + 1
    return acc + product
  }, 0)
  const remainder = sum % 11

  if (remainder === 0 || remainder === 1) {
    return 0
  }
  if (remainder === 10) {
    return 1
  }
  const DV = 11 - remainder
  return DV
}
