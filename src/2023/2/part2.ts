import { readFileSync } from "fs";
const input = readFileSync("./src/2023/2/input.txt").toString();
const data = input
  .split("\r\n")
  .map((game) => {
    const minRed = Math.max.apply(
      null,
      (game.split(":")[1].match(/(?<=^|\D)\d+ red/g) || [])?.map((red) =>
        Number(red.split(" ")[0])
      )
    );
    const minGreen = Math.max.apply(
      null,
      (game.split(":")[1].match(/(?<=^|\D)\d+ green/g) || [])?.map((green) =>
        Number(green.split(" ")[0])
      )
    );
    const minBlue = Math.max.apply(
      null,
      (game.split(":")[1].match(/(?<=^|\D)\d+ blue/g) || [])?.map((blue) =>
        Number(blue.split(" ")[0])
      )
    );
    return minRed * minGreen * minBlue;
  })
  .reduce(
    (previous, current) => Number(previous ?? 0) + Number(current ?? 0),
    0
  );

console.log(data);

