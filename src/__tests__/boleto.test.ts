import { BoletoValidator } from "../boleto";

describe("BoletoValidator", () => {
  describe("boletoBancarioCodigoBarras", () => {
    it("should return false for invalid code", () => {
      const codigo = "12345";
      expect(BoletoValidator.boletoBancarioCodeBar(codigo)).toBe(false);
    });

  });

  describe("boletoBancarioLinhaDigitavel", () => {
    it("should return false for invalid code", () => {
      const codigo = "123456789012";
      expect(BoletoValidator.boletoBancarioLinhaDigitavel(codigo)).toBe(false);
    });

  });

  describe("boletoArrecadacaoCodeBar", () => {
    it("should return false for invalid code", () => {
      const codigo = "123456789012";
      expect(BoletoValidator.boletoArrecadacaoCodeBar(codigo)).toBe(false);
    });
  });

  describe("boletoArrecadacaoLinhaDigitavel", () => {
    it("should return false for invalid code", () => {
      const codigo = "1234567890123456";
      expect(BoletoValidator.boletoArrecadacaoLinhaDigitavel(codigo)).toBe(
        false
      );
    });
  });

  describe("boletoBancarioCodigoBarras", () => {
    it("should return true for valid code", () => {
      const codigo = "00193373700000001000500940144816060680935031";
      expect(BoletoValidator.boletoBancarioCodeBar(codigo)).toBe(true);
    });
  });

  describe("boletoBancarioLinhaDigitavel", () => {
    it("should return true for valid code", () => {
      const codigo = "00190.00009 03455.877005 00388.938177 8 92930000009990";
      expect(BoletoValidator.boletoBancarioLinhaDigitavel(codigo)).toBe(true);
    });
  });

  describe("boletoArrecadacaoCodeBar", () => {
    it("should return true for valid code", () => {
      const codigo = "83620000000667800481001809756573100158963608";
      expect(BoletoValidator.boletoArrecadacaoCodeBar(codigo)).toBe(true);
    });
  });

  describe("boletoArrecadacaoLinhaDigitavel", () => {
    it("should return true for valid code", () => {
      const codigo = "836200000005 667800481000 180975657313 001589636081";
      expect(BoletoValidator.boletoArrecadacaoLinhaDigitavel(codigo)).toBe(
        true
      );
    });
  });
  describe("BoletoValidator - validateCode", () => {
    // Teste para códigos de boleto bancário
    it("deve validar código de boleto bancário válido", () => {
      const codigo = "00193373700000001000500940144816060680935031";
      const isValid = BoletoValidator.validateCode(codigo);
      expect(isValid).toBe(true);
    });

    it("deve validar código de boleto bancário linha digitável válido", () => {
      const codigo = "00190.00009 03455.877005 00388.938177 8 92930000009990";
      const isValid = BoletoValidator.validateCode(codigo);
      expect(isValid).toBe(true);
    });

    // Teste para códigos de boleto de arrecadação
    it("deve validar código de boleto de arrecadação válido", () => {
      const codigo = "83620000000667800481001809756573100158963608";
      const isValid = BoletoValidator.validateCode(codigo);
      expect(isValid).toBe(true);
    });

    it("deve validar código de boleto de arrecadação linha digitável válido", () => {
      const codigo = "836200000005 667800481000 180975657313 001589636081";
      const isValid = BoletoValidator.validateCode(codigo);
      expect(isValid).toBe(true);
    });

    // Teste para código inválido
    it("deve retornar falso para um código inválido", () => {
      const codigo = "848900000002404201622015809051904292586034111220";
      const isValid = BoletoValidator.validateCode(codigo);
      expect(isValid).toBe(false);
    });
  });
});
