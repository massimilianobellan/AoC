import { readFileSync } from "fs";
const input = readFileSync("./src/2023/7/input.txt").toString();

type handTypes =
  | "fiveOfAKind"
  | "fourOfAKind"
  | "fullHouse"
  | "threeOfAKind"
  | "twoPair"
  | "onePair"
  | "highCard";

const handOrder: handTypes[] = [
  "fiveOfAKind",
  "fourOfAKind",
  "fullHouse",
  "threeOfAKind",
  "twoPair",
  "onePair",
  "highCard",
];

const cardOrder = [
  "A",
  "K",
  "Q",
  "J",
  "T",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
];

const data = input
  .split("\r\n")
  .map((camel) => camel.split(" "))
  .map((camel, index) => {
    let hand: Record<string, number> = {};

    camel[0].split("").forEach((card) => {
      hand[card] = (hand[card] ?? 0) + 1;
    });

    const game = {
      hand: hand,
      bet: Number(camel[1]),
      handType: getHandType(hand),
      originalHand: camel[0],
      index,
    };

    return game;
  })
  .sort((a, b) => {
    if (handOrder.indexOf(a.handType) - handOrder.indexOf(b.handType) != 0) {
      return handOrder.indexOf(a.handType) - handOrder.indexOf(b.handType);
    }
    let highestCard = 0;
    for (let i = 0; i < a.originalHand.length; i++) {
      if (highestCard != 0) break;
      highestCard =
        cardOrder.indexOf(a.originalHand[i]) -
        cardOrder.indexOf(b.originalHand[i]);
    }
    return highestCard;
  });

console.log(data);

let total = 0;
data.forEach((game, index) => {
  total = total + (data.length - index) * game.bet;
});
console.log(total);

function getHandType(hand: Record<string, number>): handTypes {
  let triples = 0;
  let pairs = 0;
  for (const [key, value] of Object.entries(hand)) {
    if (value === 5) {
      return "fiveOfAKind";
    }
    if (value === 4) {
      return "fourOfAKind";
    }
    if (value === 3) {
      triples++;
    }
    if (value === 2) {
      pairs++;
    }
  }

  if (triples === 1 && pairs === 1) {
    return "fullHouse";
  }

  if (triples === 1 && pairs === 0) {
    return "threeOfAKind";
  }

  if (pairs === 2) {
    return "twoPair";
  }
  if (pairs === 1) {
    return "onePair";
  }

  return "highCard";
}

