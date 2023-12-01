import { readFileSync } from "fs";
const input = readFileSync("./src/2023/1/input.txt").toString();

const data = input
  .split("\r\n")
  .map((value) => value.split("").filter((value) => Number(value)))
  .reduce(
    (accumulator, row) => accumulator + Number(row[0] + row[row.length - 1]),
    0
  );

console.log(data);

