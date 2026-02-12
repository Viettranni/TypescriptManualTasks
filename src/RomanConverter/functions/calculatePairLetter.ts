import { RomanNumbers } from "../index.ts";

export function calculatePairLetter(firstLetter: string, secondLetter: string) {
    if (RomanNumbers[firstLetter] !== undefined && RomanNumbers[secondLetter] !== undefined) {
        if (firstLetter === "I") {
            if (secondLetter === "V" || secondLetter === "X") {
                return RomanNumbers[secondLetter] - RomanNumbers[firstLetter]
            } else {
                throw new Error("Letter pair is not valid");
            }
        }

        if (firstLetter === "X") {
            if (secondLetter === "L" || secondLetter === "C") {
                return RomanNumbers[secondLetter] - RomanNumbers[firstLetter]
            } else {
                throw new Error("Letter pair is not valid");
            }
        }

        if (firstLetter === "C") {
            if (secondLetter === "D" || secondLetter === "M") {
                return RomanNumbers[secondLetter] - RomanNumbers[firstLetter]
            } else {
                throw new Error("Letter pair is not valid");
            }
        }

        if (RomanNumbers[secondLetter]! > RomanNumbers[firstLetter]) {
            throw new Error("Invalid pair: " + firstLetter + secondLetter);
        }
    } else {
        throw new Error("The roman letters are not in the correct order for calculating the pair value")
    }
}