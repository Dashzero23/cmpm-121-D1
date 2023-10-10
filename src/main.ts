import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nguyen's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

// Create button
const monsterButton = document.createElement("button");
monsterButton.innerHTML = "👾";
app.append(monsterButton);

const counterReport = document.createElement("div");
counterReport.innerHTML = `Monsters Slain: ${counter}`;
app.append(counterReport);

// Increase counter when click button
monsterButton.addEventListener("click", () => {
  counter++;
  counterReport.innerHTML = `Monsters Slain: ${counter}`;
});

// Increase counter after interval
setInterval(() => {
    counter++;
    counterReport.innerHTML = `Monsters Slain: ${counter}`;
  }, 1000);
