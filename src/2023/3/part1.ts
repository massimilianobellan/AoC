import { readFileSync } from "fs";
const input = readFileSync("./src/2023/3/input.txt").toString();
let total = 0;
const data = input.split("\r\n").forEach((row, index, input) => {
  [...row.matchAll(/[0-9]+/g)].forEach((match) => {
    let surroundings = "";
    for (let i = -1; i < 2; i++) {
      if (input[index + i]) {
        surroundings =
          surroundings +
          input[index + i]?.substring(
            (match.index ?? 0) - 1,
            match[0].length + (match.index ?? 0) + 1
          );
      }
    }
    if (surroundings.match(/[^0-9.]/)) {
      total = total + Number(match[0]);
    }
  });
});

console.log(total);

