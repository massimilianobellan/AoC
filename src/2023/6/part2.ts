import { readFileSync } from "fs";
const input = readFileSync("./src/2023/6/input.txt").toString();
const data = input.split("\r\n");
const time = Number(data[0].split(" ").filter(Boolean).slice(1).join(""));
const distance = Number(data[1].split(" ").filter(Boolean).slice(1).join(""));

const time1 = (-time + Math.sqrt(time ** 2 - 4 * -1 * -distance)) / (2 * -1);
const time2 = (-time - Math.sqrt(time ** 2 - 4 * -1 * -distance)) / (2 * -1);

console.log(Math.abs(Math.ceil(time1) - Math.floor(time2)) + 1);

