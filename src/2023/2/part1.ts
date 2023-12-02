import { readFileSync } from "fs";
const input = readFileSync("./src/2023/2/input.txt").toString();
const data = input
  .split("\r\n")
  .map((game) => {
    let possibleGame = true;
    game
      .split(":")[1]
      .match(/(?<=^|\D)\d+ (green|red|blue)/g)
      ?.map((marbles) => marbles.split(" "))
      .forEach((pull) => {
        if (pull[1] == "red" && Number(pull[0]) > 12) {
          possibleGame = false;
        }
        if (pull[1] == "green" && Number(pull[0]) > 13) {
          possibleGame = false;
        }
        if (pull[1] == "blue" && Number(pull[0]) > 14) {
          possibleGame = false;
        }
      });
    console.log(game.split(":")[0].replace(/\D/g, ""), possibleGame);
    return possibleGame ? game.split(":")[0].replace(/\D/g, "") : undefined;
  })
  .reduce(
    (previous, current) => Number(previous ?? 0) + Number(current ?? 0),
    0
  );

console.log(data);

