import { describe, it, expect } from "vitest";
import { convertRomanNumber } from "../index.ts";

describe("convertRomanNumber function", () => {

  it("Should convert valid Roman numerals correctly", () => {
    expect(convertRomanNumber("I")).toBe(1);
    expect(convertRomanNumber("V")).toBe(5);
    expect(convertRomanNumber("X")).toBe(10);
    expect(convertRomanNumber("L")).toBe(50);
    expect(convertRomanNumber("C")).toBe(100);
    expect(convertRomanNumber("D")).toBe(500);
    expect(convertRomanNumber("M")).toBe(1000);
    expect(convertRomanNumber("IV")).toBe(4);
    expect(convertRomanNumber("IX")).toBe(9);
    expect(convertRomanNumber("XIV")).toBe(14);
    expect(convertRomanNumber("MCM")).toBe(1900);
  });

  it("Should throw for invalid Roman numerals", () => {
    expect(() => convertRomanNumber("IIII")).toThrow();
    expect(() => convertRomanNumber("VV")).toThrow();
    expect(() => convertRomanNumber("IVIV")).toThrow();
    expect(() => convertRomanNumber("IIV")).toThrow();
    expect(() => convertRomanNumber("IVV")).toThrow();
    expect(() => convertRomanNumber("VX")).toThrow();
  });
});