import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nguyen's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
let lastTimestamp: number = 0;
const incrementPerSecond: number = 1

// Create button
const monsterButton = document.createElement("button");
monsterButton.innerHTML = "👾";
monsterButton.style.fontSize = "30pt";
app.append(monsterButton);

const counterReport = document.createElement("div");
counterReport.innerHTML = `Monsters Slain: ${counter.toFixed(2)}`;
app.append(counterReport);

// Increase counter when click button
monsterButton.addEventListener("click", () => {
  counter++;
  counterReport.innerHTML = `Monsters Slain: ${counter.toFixed(2)}`;
});

// Function to update the counter based on elapsed time
function updateCounter(timestamp: number) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  // Calculate elapsed time and increment in seconds
  const elapsedTime = (timestamp - lastTimestamp) / 1000;
  const increment = incrementPerSecond * elapsedTime;

  // Update the counter and report
  counter += increment;
  counterReport.innerHTML = `Monsters Slain: ${counter.toFixed(2)}`;

  // Update the last timestamp
  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);
