import { readFileSync } from "fs";
const input = readFileSync("./src/2023/6/input.txt").toString();
const data = input.split("\r\n");
const time = data[0]
  .split(" ")
  .filter(Boolean)
  .slice(1)
  .map((value) => Number(value));
const distance = data[1]
  .split(" ")
  .filter(Boolean)
  .slice(1)
  .map((value) => Number(value));

let total = 1;

time.forEach((value, index) => {
  let timesBeaten = 0;
  for (let i = 0; i < distance[index]; i++) {
    if (i * (value - i) > distance[index]) {
      timesBeaten++;
    }
  }
  total = total * timesBeaten;
});

console.log(total);

