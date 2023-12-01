import { mkdir, writeFile } from "fs/promises";
import { existsSync } from "fs";

if (process.argv.length != 4) {
  console.error("Usage: npm run setup {year} {day}");
  process.exit(0);
}

const year = parseInt(process.argv[2]);
const day = parseInt(process.argv[3]);

if (typeof year != "number" || typeof day != "number") {
  console.error("Value passed is not a number!");
  process.exit(0);
}

if (day < 1 || day > 25) {
  console.error("Please enter a day between 1 and 25");
}

async function setup() {
  await createDirectory();
  await createInputFile();
  await createSolutionFile("part1");
  await createSolutionFile("part2");
}

console.log(`Created the files for year ${year} day ${day} `);

async function createDirectory() {
  try {
    await mkdir(`src/${year}`);
  } catch (err) {}
  try {
    await mkdir(`src/${year}/${day}`);
  } catch (err) {}
}

async function createInputFile() {
  if (existsSync(`src/${year}/${day}/input.txt`)) {
    console.log(`input.txt alreadt exists`);
  } else {
    writeFile(
      `src/${year}/${day}/input.txt`,
      `visit https://adventofcode.com/${year}/day/${day}/input and paste the part 1 input here`
    );
  }
}

async function createSolutionFile(name: string) {
  if (existsSync(`src/${year}/${day}/${name}.ts`)) {
    console.log(`${name}.ts alreadt exists`);
  } else {
    writeFile(
      `src/${year}/${day}/${name}.ts`,
      `import { readFileSync } from "fs";\nconst input = readFileSync("./src/${year}/${day}/input.txt").toString();\nconst data = input.split("\\r\\n");\n\nconsole.log(data);\n\n`
    );
  }
}

setup();
