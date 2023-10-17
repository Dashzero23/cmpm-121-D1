import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Nguyen's game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = 0;
let lastTimestamp = 0;
let incrementPerSecond = 0;

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

  // Calculate elapsed time in seconds
  const elapsedTime = (timestamp - lastTimestamp) / 1000;

  // Calculate the increment based on elapsed time
  const increment = incrementPerSecond * elapsedTime;

  // Update the counter and report
  counter += increment;
  counterReport.innerHTML = `Monsters Slain: ${counter.toFixed(2)}<br/>Kill rate: ${incrementPerSecond.toFixed(1)}`;

  // Update the last timestamp
  lastTimestamp = timestamp;

  // Request the next animation frame
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  purchased: number;
}

// Create upgrade items
const upgrades: Item[] = [
  { name: "🦅", cost: 10, rate: 0.5, description: "Support Pet: kill slowly", purchased: 0 },
  { name: "🗡️", cost: 100, rate: 5, description: "Small dagger: cut like butter", purchased: 0 },
  { name: "🪓", cost: 200, rate: 20, description: "Big axe: big kill", purchased: 0 },
  { name: "🔫", cost: 1000, rate: 100, description: "Gun: speak for itself", purchased: 0 },
  { name: "☢️", cost: 100000, rate: 10000, description: "Nuke: please don't", purchased: 0 }
];

function createUpgradeButtons() {
  for (const upgrade of upgrades) {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})<br/>${upgrade.description}<br/>Purchased: ${upgrade.purchased}`;
    app.append(upgradeButton);

    // Function to handle the upgrade purchase
    upgradeButton.addEventListener("click", () => {
      if (counter >= upgrade.cost) {
        counter -= upgrade.cost; // Deduct the cost from the counter
        incrementPerSecond += upgrade.rate; // Increase the growth rate
        upgrade.purchased += 1;
        upgrade.cost *= 1.15;
        counterReport.innerHTML = `Monsters Slain: ${counter.toFixed(2)}`;
        updateButtonStates();
      }
    });
  }
}

function updateButtonStates() {
  for (const upgrade of upgrades) {
    const buttons = document.querySelectorAll("button");
    
    buttons.forEach((button) => {
      if (button.textContent && button.textContent.includes(upgrade.name)) {
        const upgradeButton = button as HTMLButtonElement;
        upgradeButton.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})<br/>${upgrade.description}<br/>Purchased: ${upgrade.purchased}`;

        if (counter < upgrade.cost) {
          upgradeButton.disabled = true; // Disable the button
        }
        
        else {
          upgradeButton.disabled = false; // Enable the button
        }
      }
    });
  }
}

// Call the function to create upgrade buttons
createUpgradeButtons();

// Periodically check and update button states
setInterval(updateButtonStates, 100);