import { readFileSync } from "fs";
const input = readFileSync("./src/2023/3/input.txt").toString();
let total = 0;
const data = input.split("\r\n").forEach((row, index, input) => {
  [...row.matchAll(/\*/g)].forEach((match) => {
    const numbers: number[] = [];
    const above = input[index - 1]
      ?.substring((match.index ?? 0) - 1, (match.index ?? 0) + 2)
      .matchAll(/[0-9]+/g);
    const below = input[index + 1]
      ?.substring((match.index ?? 0) - 1, (match.index ?? 0) + 2)
      .matchAll(/[0-9]+/g);
    const side = input[index]
      ?.substring((match.index ?? 0) - 1, (match.index ?? 0) + 2)
      .matchAll(/[0-9]+/g);
    [...(above ?? [])].forEach((number) => {
      numbers.push(
        Number(
          getNumber(
            input[index - 1],
            (match.index ?? 0) - 1 + (number.index ?? 0)
          )
        )
      );
    });
    [...(below ?? [])].forEach((number) => {
      numbers.push(
        Number(
          getNumber(
            input[index + 1],
            (match.index ?? 0) - 1 + (number.index ?? 0)
          )
        )
      );
    });
    [...(side ?? [])].forEach((number) => {
      numbers.push(
        Number(
          getNumber(input[index], (match.index ?? 0) - 1 + (number.index ?? 0))
        )
      );
    });
    if (numbers.length === 2) {
      console.log(numbers, index);
      total = total + numbers[0] * numbers[1];
    }
  });
});

function getNumber(row: string, index: number) {
  let number = row[index];

  // Forwards
  for (let i = 1; i < row.length; i++) {
    if (isNaN(Number(row[index + i]))) {
      break;
    }
    number = number + row[index + i];
  }

  // Backwards
  for (let i = 1; i < row.length; i++) {
    if (isNaN(Number(row[index - i]))) {
      break;
    }
    number = row[index - i] + number;
  }

  return number;
}

console.log(total);

