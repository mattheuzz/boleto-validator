export interface Block {
  num: string;
  DV: string;
}

export function modulo10(block: string): number {
  const code = block.split('').reverse();
  const sum = code.reduce((acc, current, index) => {
    let value = Number(current) * (((index + 1) % 2) + 1);
    value = value > 9 ? Math.trunc(value / 10) + (value % 10) : value;
    return acc + value;
  }, 0);
  return Math.ceil(sum / 10) * 10 - sum;
}

export function modulo11Bancario(block: string): number {
  const code = block.split('').reverse();
  let multiplier = 2;
  const sum = code.reduce((acc, current) => {
    const value = Number(current) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
    return acc + value;
  }, 0);
  const remainder = sum % 11;
  const DV = 11 - remainder;
  if (DV === 0 || DV === 10 || DV === 11) return 1;
  return DV;
}

export function modulo11Arrecadacao(block: string): number {
  const code = block.split('').reverse();
  let multiplier = 2;
  const sum = code.reduce((acc, current) => {
    const value = Number(current) * multiplier;
    multiplier = multiplier === 9 ? 2 : multiplier + 1;
    return acc + value;
  }, 0);
  const remainder = sum % 11;

  if (remainder === 0 || remainder === 1) {
    return 0;
  }
  if (remainder === 10) {
    return 1;
  }
  const DV = 11 - remainder;
  return DV;
}
