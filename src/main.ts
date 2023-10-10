import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nguyen's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const monsterButton = document.createElement("button");
monsterButton.innerHTML = "👾";
app.append(monsterButton);