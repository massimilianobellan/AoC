import { readFileSync } from "fs";
const input = readFileSync("./src/2023/4/input.txt").toString();
const data = input
  .split("\r\n")
  .map((row) => {
    const winnings = [...row.matchAll(/(?<=:)\s*\d+(?:\s+\d+)*(?=.*\|)/g)]
      .map((match) => match[0])[0]
      .substring(1)
      .split(" ")
      .filter(Boolean);
    const numbers = [...row.matchAll(/(?<=\|)\s*\d+(?:\s+\d+)*/g)]
      .map((match) => match[0])[0]
      .substring(1)
      .split(" ")
      .filter(Boolean);
    let winners: string[] = [];
    winnings.forEach((winning) => {
      if (numbers.includes(winning)) {
        winners.push(winning);
      }
    });
    return getPoints(winners);
  })
  .reduce((previous, current) => previous + current, 0);

console.log(data);

function getPoints(numbers: string[]): number {
  if (numbers.length === 0) {
    return 0;
  } else {
    return 2 ** (numbers.length - 1);
  }
}

