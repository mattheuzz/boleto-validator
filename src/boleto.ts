import { modulo10, modulo11Bancario, modulo11Arrecadacao } from './modulo'
interface BoletoBlock {
  num: string;
  DV: string;
}

interface ValidatorMethod {
  (code: string, validateBlocks: boolean): boolean;
}

export class BoletoValidator {
  static clearMask(code: string): string {
    return code.replace(/\D+/g, "");
  }

  static convertToBoletoArrecadacaoCodeBar(code: string): string {
    const cod = this.clearMask(code);
    const codeBarParts = Array.from({ length: 4 }, (_, index) => {
      const start = 11 * index + index;
      const end = 11 * (index + 1) + index;
      return cod.substring(start, end);
    });
    return codeBarParts.join("");
  }

  static convertToBoletoBancarioCodeBar(code: string): string {
    const cod = this.clearMask(code);
    const codeBarParts = [
      cod.substring(0, 3),
      cod.substring(3, 4),
      cod.substring(32, 33),
      cod.substring(33, 37),
      cod.substring(37, 47),
      cod.substring(4, 9),
      cod.substring(10, 20),
      cod.substring(21, 31),
    ];
    return codeBarParts.join("");
  }

  static boletoArrecadacaoCodeBar(code: string): boolean {
    const cod = this.clearMask(code);
    if (!/^[0-9]{44}$/.test(cod) || Number(cod[0]) !== 8) return false;
    const currencyCode = Number(cod[2]);
    const DV = Number(cod[3]);
    const block = cod.substring(0, 3) + cod.substring(4);
    const module: (value: string) => number =
      currencyCode === 6 || currencyCode === 7 ? modulo10 : modulo11Arrecadacao;
    return module(block) === DV;
  }

  static boletoArrecadacaoLinhaDigitavel(
    code: string,
    validateBlocks = false
  ): boolean {
    const cod = this.clearMask(code);
    if (!/^[0-9]{48}$/.test(cod) || Number(cod[0]) !== 8) return false;
    const validDV = this.boletoArrecadacaoCodeBar(
      this.convertToBoletoArrecadacaoCodeBar(cod)
    );
    if (!validateBlocks) return validDV;
    const currencyCode = Number(cod[2]);
    const module: (value: string) => number =
      currencyCode === 6 || currencyCode === 7 ? modulo10 : modulo11Arrecadacao;
    const blocks: BoletoBlock[] = Array.from({ length: 4 }, (_, index) => {
      const start = 11 * index + index;
      const end = 11 * (index + 1) + index;
      return {
        num: cod.substring(start, end),
        DV: cod.substring(end, end + 1),
      };
    });
    const validBlocks = blocks.every((e) => module(e.num) === Number(e.DV));
    return validBlocks && validDV;
  }

  static boletoArrecadacao(code: string, validateBlocks = false): boolean {
    const cod = this.clearMask(code);
    if (cod.length === 44) return this.boletoArrecadacaoCodeBar(cod);
    if (cod.length === 48)
      return this.boletoArrecadacaoLinhaDigitavel(code, validateBlocks);
    return false;
  }

  static boletoBancarioCodeBar(code: string): boolean {
    const cod = this.clearMask(code);
    if (!/^[0-9]{44}$/.test(cod)) return false;
    const DV = cod[4];
    const block = cod.substring(0, 4) + cod.substring(5);
    return modulo11Bancario(block) === Number(DV);
  }

  static boletoBancarioLinhaDigitavel(
    code: string,
    validateBlocks = false
  ): boolean {
    const cod = this.clearMask(code);
    if (!/^[0-9]{47}$/.test(cod)) return false;
    const blocks: BoletoBlock[] = [
      { num: cod.substring(0, 9), DV: cod.substring(9, 10) },
      { num: cod.substring(10, 20), DV: cod.substring(20, 21) },
      { num: cod.substring(21, 31), DV: cod.substring(31, 32) },
    ];
    const validBlocks = validateBlocks
      ? blocks.every((e) => modulo10(e.num) === Number(e.DV))
      : true;
    const validDV = this.boletoBancarioCodeBar(
      this.convertToBoletoBancarioCodeBar(cod)
    );
    return validBlocks && validDV;
  }

  static boletoBancario(code: string, validateBlocks = false): boolean {
    const cod = this.clearMask(code);
    if (cod.length === 44) return this.boletoBancarioCodeBar(cod);
    if (cod.length === 47)
      return this.boletoBancarioLinhaDigitavel(code, validateBlocks);
    return false;
  }

  // General method to validate any type of code
  static validateCode(code: string, validateBlocks = false): boolean {
    const cod = this.clearMask(code);
    const codeLengthToMethodBancario: { [key: number]: ValidatorMethod } = {
      44: this.boletoBancario,
      47: this.boletoBancarioLinhaDigitavel,
    };
    const codeLengthToMethodArrecadacao: { [key: number]: ValidatorMethod } = {
      44: this.boletoArrecadacaoCodeBar,
      48: this.boletoArrecadacaoLinhaDigitavel,
    };

    const validatorMethodBancario = codeLengthToMethodBancario[cod.length];
    const validatorMethodArrecadacao =
      codeLengthToMethodArrecadacao[cod.length];

    if (validatorMethodBancario) {
      const isValidBancario = validatorMethodBancario.call(
        this,
        cod,
        validateBlocks
      );
      if (isValidBancario) {
        return true;
      }
    }

    if (validatorMethodArrecadacao) {
      return validatorMethodArrecadacao.call(this, cod, validateBlocks);
    }

    return false;
  }
}
