import { readFileSync } from "fs";
const input = readFileSync("./src/2023/4/input.txt").toString();

let copiesOfCards: Record<number, number> = {};

for (let i = 1; i <= 218; i++) {
  copiesOfCards[i] = 1;
}

const data = input.split("\r\n").forEach((row, index) => {
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

  const copiesOfThisCard = copiesOfCards[index + 1] ?? 1;
  console.log(
    "Doing card Number",
    index + 1,
    "it has",
    copiesOfThisCard,
    "copies"
  );
  for (let i = 0; i < copiesOfThisCard; i++) {
    winnings.forEach((winning) => {
      if (numbers.includes(winning)) {
        winners.push(winning);
      }
    });
    winners.forEach((_value, valueIndex) => {
      const cardNumeberToAdd = index + 2 + valueIndex;
      const copiesOfCardToAdd = copiesOfCards[cardNumeberToAdd];
      copiesOfCards[cardNumeberToAdd] = (copiesOfCardToAdd ?? 1) + 1;
      if (cardNumeberToAdd === 6) {
        console.log("Adding 1 to card 6 from", index + 1);
      }
    });
    winners = [];
  }
});

let total = 0;
for (let key in copiesOfCards) {
  total = total + copiesOfCards[key];
}

console.log(total);

