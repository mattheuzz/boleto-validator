import dayjs = require("dayjs")
import {
  calculateModulo10,
  calculateModulo11Arrecadacao,
  calculateModulo11Bancario,
} from "./modulo"

interface Block {
  num: string
  DV: string
}

export interface BoletoInfo {
  isValid: boolean
  bankCode?: string
  value?: number
  dueDate?: string
  cleanedCode?: string
}

const is47or48Digits = /^[0-9]{47,48}$/

export class BoletoProcessor {
  constructor() {}
  private removeNonDigits(input: string): string {
    return input.replace(/\D+/g, "")
  }

  private validateTypeableLine(code: string, validateBlocks = false): boolean {
    const cleanedCode = this.removeNonDigits(code)
    if (!is47or48Digits.test(cleanedCode)) return false
    return cleanedCode.length === 47
      ? this.validateBankLine(cleanedCode, validateBlocks)
      : this.validateArrecadacaoLine(cleanedCode)
  }

  validateBankLine(cleanedCode: string, validateBlocks = false): boolean {
    const blocks: Block[] = [
      { num: cleanedCode.substring(0, 9), DV: cleanedCode.substring(9, 10) },
      { num: cleanedCode.substring(10, 20), DV: cleanedCode.substring(20, 21) },
      { num: cleanedCode.substring(21, 31), DV: cleanedCode.substring(31, 32) },
    ]
    const areBlocksValid = validateBlocks
      ? blocks.every((e) => calculateModulo10(e.num) === Number(e.DV)) ||
        blocks.every((e) => calculateModulo11Bancario(e.num) === Number(e.DV))
      : true

    return areBlocksValid
  }
  validateArrecadacaoLine(code: string): boolean {
    const cleanedCode = this.removeNonDigits(code)
    if (!is47or48Digits.test(cleanedCode) || Number(cleanedCode[0]) !== 8)
      return false
    const currencyCode = Number(cleanedCode[2])
    const checksumFunction =
      currencyCode === 6 || currencyCode === 7
        ? calculateModulo10
        : calculateModulo11Arrecadacao
    const blocks: Block[] = Array.from({ length: 4 }, (_v, index) => {
      const start = 11 * index + index
      const end = 11 * (index + 1) + index
      return {
        num: cleanedCode.substring(start, end),
        DV: cleanedCode.substring(end, end + 1),
      }
    })
    const areBlocksValid = blocks.every(
      (e) => checksumFunction(e.num) === Number(e.DV)
    )

    return areBlocksValid
  }
  private extractBankCode(cleanedCode: string): string {
    return cleanedCode.substring(0, 3)
  }

  private extractValue(cleanedCode: string): number {
    const valueDigits = cleanedCode.substring(cleanedCode.length - 10)
    return parseFloat(valueDigits) / 100
  }

  private extractDueDate(cleanedCode: string): string {
    const isLongLine = cleanedCode.length === 48
    const dueDateStart = isLongLine ? 33 : 32
    const dueDateEnd = dueDateStart + 4
    const dueDateDigits = cleanedCode.substring(dueDateStart, dueDateEnd)
    const daysSinceBaseDate = parseInt(dueDateDigits)
    const baseDate = dayjs("1997-10-07")
    return baseDate.add(daysSinceBaseDate, "day").format("YYYY-MM-DD")
  }

  public getBoletoInfo(code: string): BoletoInfo {
    const cleanedCode = this.removeNonDigits(code)
    const isValid = this.validateTypeableLine(cleanedCode)

    if (!isValid) {
      return { isValid: false }
    }

    const bankCode = this.extractBankCode(cleanedCode)

    const value = this.extractValue(cleanedCode)

    const dueDate = this.extractDueDate(cleanedCode)

    return {
      isValid: true,
      bankCode,
      value,
      dueDate,
      cleanedCode,
    }
  }
}
