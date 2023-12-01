import { readFileSync } from "fs";
const input = readFileSync("./src/2023/1/input.txt").toString();

const numberMap = new Map([
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
]);

function matchNumber(input: string, substring = 1) {
  if (Number(input[0])) return Number(input[0]);
  if (substring > input.length) return;
  if (numberMap.get(input.substring(0, substring))) {
    return numberMap.get(input.substring(0, substring));
  }
  return matchNumber(input, substring + 1);
}

const data = input
  .split("\r\n")
  .map((row) => {
    let newValue: number[] = [];
    for (let i = 0; i < row.length; i++) {
      const matchedNumber = matchNumber(row.substring(i));
      if (matchedNumber) {
        newValue.push(matchedNumber);
      }
    }
    return newValue;
  })
  .reduce(
    (accumulator, row) =>
      accumulator + Number(`${row[0]}${row[row.length - 1]}`),
    0
  );

console.log(data);

