import { RomanNumbers } from "../index.ts";

export function validateRomanNumber(roman_number: string): boolean {
    // Check the triple letters: I, X, C, M 
    var tripleCheck = 0;
    var previousLetter = "";
    var seenSubtractivePairs = new Set<string>();
    var acceptableLetters = ["I", "V", "X", "L", "C", "D", "M"];

    for (var letter of roman_number) {
        if (!acceptableLetters.includes(letter)) {
            throw new Error("The given Roman numbers includes a letter not Roman number.")
        }
        
        if (previousLetter === "") {
            previousLetter = letter;
            continue;
        }

        const currentValue = RomanNumbers[letter]!;
        const previousValue = RomanNumbers[previousLetter]!;

        if (
            letter == previousLetter &&
            (letter === "I" || letter === "X" || letter === "C" || letter === "M")
        ) {
            tripleCheck += 1;
        } 

        if (
            letter == previousLetter &&
            (letter === "V" || letter === "L" || letter === "D")
        ) {
            throw new Error("Roman numbers V, L ja D can not be twice");
        }

        // Checking if the next number is large
        if (tripleCheck >= 1  && RomanNumbers[letter]! > RomanNumbers[previousLetter]!) {
            throw new Error("Invalid Roman numeral sequence, the next number can't be larger than the previous smalls");
        }

        // Storing the pair to avoid situations like IVIV
        if (previousValue < currentValue) {
            const pair = previousLetter + letter;

            if (seenSubtractivePairs.has(pair)) {
                throw new Error("Subtractive pair " + pair + " cannot be repeated");
            }

            seenSubtractivePairs.add(pair);
        }

        // The specific Roman numbers can't be repeated more than 3 times
        if (tripleCheck == 3) {
            throw new Error("Roman numbers I, X, C ja M cannot be repeated more than 3 times");
        }

        previousLetter = letter;
    }

    return true;
}