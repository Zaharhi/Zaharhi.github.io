let sheepCount = 1; // Start with one sheep
let woolCount = 0;
let yarnCount = 0;
let money = 0;

function updateStats() {
    document.getElementById('sheepCount').textContent = sheepCount;
    document.getElementById('woolCount').textContent = woolCount;
    document.getElementById('yarnCount').textContent = yarnCount;
    document.getElementById('moneyCount').textContent = money;
}

function shearSheep() {
    woolCount += sheepCount * 2; // Each sheep produces 2 wool
    updateStats();
}

function makeYarn() {
    if (woolCount >= 5) { // Yarn requires 5 wool
        woolCount -= 5;
        yarnCount++;
        updateStats();
    } else {
        alert('Not enough wool to make yarn!');
    }
}
function buySheep() {
    if (money >= 100) { // Each sheep costs $100
        money -= 100;
        sheepCount++;
        addSheep(); // Add a new sheep visually
        updateStats();
    } else {
        alert('Not enough money to buy a sheep!');
    }
}

function addSheep() {
    const pasture = document.getElementById('pasture');
    const sheep = document.createElement('div');
    sheep.className = 'sheep'; // Use 'sheep' class for all sheep
    sheep.style.left = Math.floor(Math.random() * (600 - 50)) + 'px'; // Random left position
    sheep.style.top = Math.floor(Math.random() * (400 - 50)) + 'px'; // Random top position
    pasture.appendChild(sheep);
}
function sellYarn() {
    if (yarnCount >= 1) {
        yarnCount--;
        money += 10; // Each yarn sells for $10
        updateStats();
    } else {
        alert('No yarn to sell!');
    }
}
// Update stats when the page loads
updateStats();
function buyPasture(pastureType) {
    let targetPage = '';

    // Determine the cost and target page based on the pasture type
    if (pastureType === 'pig') {
        targetPage = '../Pig/pig.html';
    } else if (pastureType === 'cow') {
        targetPage = '../Cow/cow.html';
    }

    // Redirect to the target page
    window.location.href = targetPage;
}

