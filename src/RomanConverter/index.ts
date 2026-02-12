import * as readline from "readline";
import { validateRomanNumber } from "./functions/validateRomanNumber.ts";
import { calculatePairLetter } from "./functions/calculatePairLetter.ts";
import type { IRomanNumbers } from "./interfaces/IRomanNumbers.ts";

export const RomanNumbers: IRomanNumbers = {
    "I": 1,
    "V": 5,
    "X": 10,
    "L": 50,
    "C": 100,
    "D": 500,
    "M": 1000
};

export function convertRomanNumber(roman_number: string): number {
    var convertedNumber = 0;
    var totalLetters = 0;
 
    // Saving the previous number to check if the numbers are same
    var previousRomanLetter: string = "";
    
    // Validating the roman number
    validateRomanNumber(roman_number)

    // Looping over the Roman numbers and adding them up
    for (var letter of roman_number) {
        const currentValue = RomanNumbers[letter];

        if (currentValue === undefined) continue;

        const previousValue = previousRomanLetter !== null ? RomanNumbers[previousRomanLetter] : undefined;

        totalLetters += 1;

        if (previousValue !== undefined && previousValue < currentValue) {
            const pairValue = calculatePairLetter(previousRomanLetter, letter);
            if (pairValue !== undefined) {
                convertedNumber -= previousValue;
                convertedNumber += pairValue;
            }
             else {
                convertedNumber += currentValue;
            }
        } else {
            convertedNumber += currentValue;
        }
        previousRomanLetter = letter;
    }
    return convertedNumber;
};

// Main function
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function askQuestion() {
        rl.question('Enter Roman number: ', (roman) => {
            try {
                const result = convertRomanNumber(roman);
                console.log("The converted Roman number from " + roman + " is " + result + ".");
            } catch (error) {
                if (error instanceof Error) {
                    console.error("Invalid Roman numeral: " + error.message);
                }
            } finally {
                askQuestion(); 
            }  
        });
    }

    askQuestion(); 
};

main();