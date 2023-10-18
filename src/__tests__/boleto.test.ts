import { BoletoInfo, BoletoProcessor } from "../boleto";
import dayjs = require("dayjs");

describe("BoletoProcessor", () => {
  let processor: BoletoProcessor;

  beforeEach(() => {
    processor = new BoletoProcessor();
  });

  describe("removeNonDigits", () => {
    it("should remove non-digit characters", () => {
      const result = processor["removeNonDigits"]("123aB456C7890");
      expect(result).toBe("1234567890");
    });
  });

  describe("validateTypeableLine", () => {
    it("should validate a typeable line for a bank", () => {
      const validCode = "00190000090345587700500388938177892930000009999";
      expect(processor["validateTypeableLine"](validCode)).toBe(true);
    });
  });

  describe("getBoletoInfo", () => {
    it("should return boleto info", () => {
      const code = "00190.00009 03455.877005 00388.938177 8 92930000009999"; // A valid boleto code
      const result: BoletoInfo = processor.getBoletoInfo(code);
      expect(result.isValid).toBe(true);
      expect(result.bankCode).toBe("001");
      expect(result.value).toBeCloseTo(99.99);
      expect(result.dueDate).toBe("2022-03-19");
      expect(result.cleanedCode).toBe("00190000090345587700500388938177892930000009999");
    });

    it("should return invalid boleto info for invalid code", () => {
      const code = "invalidCode";
      const result: BoletoInfo = processor.getBoletoInfo(code);
      expect(result.isValid).toBe(false);
    });
  });
});
