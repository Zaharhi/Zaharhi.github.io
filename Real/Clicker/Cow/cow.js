let cowCount = 1; // Start with one  cows
let milkCount = 0;
let cheeseCount = 0;
let money = 0;
let breedingChance = 5; // Initial breeding chance
let breedingSpeed = 2; // Two breeding attempts per 10 seconds


function updateStats() {
    document.getElementById('cowCount').textContent = cowCount;
    document.getElementById('milkCount').textContent = milkCount;
    document.getElementById('cheeseCount').textContent = cheeseCount;
    document.getElementById('moneyCount').textContent = money;
    document.getElementById('breedingSpeedValue').textContent = breedingSpeed; // Update breeding speed display
    document.getElementById('breedingChanceDisplay').textContent = `${breedingChance}%`; // Set the initial value for breeding chance
}




function generateMilk() {
    milkCount += 2 * cowCount;
    updateStats();
}

function buyCheese() {
    if (milkCount >= 5) { // Cheese costs 5 milk
        milkCount -= 5;
        cheeseCount++;
        updateStats();
    } else {
        alert('Not enough milk to make cheese!');
    }
}

let gourmetCheeseUpgrade = false; // Flag to track if the upgrade has been purchased

function upgradeToGourmetCheese() {
    if (!gourmetCheeseUpgrade && money >= 50) { // Check if upgrade hasn't been purchased and player has enough money
        money -= 50; // Deduct the cost of the upgrade
        gourmetCheeseUpgrade = true; // Set the upgrade flag to true
        updateStats(); // Update the displayed stats
        alert('Congratulations! Your cheese is now upgraded to gourmet cheese.');
    } else if (gourmetCheeseUpgrade) {
        alert('You have already upgraded to gourmet cheese.');
    } else {
        alert('Not enough money for the upgrade!');
    }
}
function upgradeBreedingSpeed() {
    if (money >= 100) { // Assuming upgrade costs $100
        money -= 100;
        breedingSpeed *= 2; // Double the breeding chance
        updateStats();
        alert('Breeding speed upgraded successfully!');
    } else {
        alert('Not enough money for the upgrade!');
    }
}

function sellAllCheese() {
    if (cheeseCount > 0) {
        const totalCheeseValue = gourmetCheeseUpgrade ? cheeseCount * 10 : cheeseCount * 5;
        money += totalCheeseValue;
        cheeseCount = 0;
        updateStats();
    } else {
        alert('No cheese to sell!');
    }
}

function sellCheese() {
    if (cheeseCount >= 1) {
        cheeseCount--;
        money += gourmetCheeseUpgrade ? 10 : 5; // If upgraded, sell for $10; otherwise, sell for $5
        updateStats();
    } else {
        alert('No cheese to sell!');
    }
}



function upgradeBreedingChance() {
    if (money >= 100) { // Assuming upgrade costs $100
        money -= 100;
        breedingChance *= 2; // Double the breeding chance
        updateStats();
    } else {
        alert('Not enough money for the upgrade!');
    }
}

function upgradeMilkProduction() {
    if (money >= 50) { // Assuming upgrade costs $50
        money -= 50;
        milkProductionPerCow++;
        updateStats();
    } else {
        alert('Not enough money for the upgrade!');
    }
}

function createCow() {
    const pasture = document.getElementById('pasture');
    const cow = document.createElement('div');
    cow.className = 'cow'; // Use 'cow' class for all cows
    cow.style.left = Math.floor(Math.random() * (600 - 50)) + 'px'; // Random left position
    cow.style.top = Math.floor(Math.random() * (400 - 50)) + 'px'; // Random top position
    pasture.appendChild(cow);

    cowCount++; // Increment cow count
    milkCount += 2; // Each adult cow adds 2 milk to production
    updateStats();
    return cow;
}

function checkForOverlap(cow) {
    const cows = document.getElementsByClassName('cow');
    for (let i = 0; i < cows.length; i++) {
        if (cows[i] !== cow && isOverlapping(cow, cows[i])) {
            return true;
        }
    }
    return false;
}

function isOverlapping(cow1, cow2) {
    const rect1 = cow1.getBoundingClientRect();
    const rect2 = cow2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function removeCow() {
    const pasture = document.getElementById('pasture');
    const cows = document.getElementsByClassName('cow');
    if (cows.length > 1) {
        pasture.removeChild(cows[0]);
        cowCount--; // Decrement cow count
    }
    updateStats();
}


// Generate a cow every 5 seconds
setInterval(function() {
    const newCow = createCow();
    if (checkForOverlap(newCow)) {
        removeCow();
    }
}, 5000);

// Generate milk every second
setInterval(generateMilk, 1000);

// Update stats when the page loads
updateStats();
function reproduceCow() {
    const chance = Math.random(); // Generate a random number between 0 and 1
    if (chance < (breedingChance / 100)) { // Use breedingChance variable
        cowCount++;
        createCow();
        updateStats();
    }

    // Introduce breeding speed check
    setTimeout(reproduceCow, 10000 / breedingSpeed); // 60,000 ms in a minute
}





function killCow() {
    if (cowCount > 1) {
        cowCount--;
        const pasture = document.getElementById('pasture');
        pasture.removeChild(document.getElementsByClassName('cow')[0]);
        updateStats();
    }
}
function harvestCow() {
    const pasture = document.getElementById('pasture');
    const cows = document.getElementsByClassName('cow');

    if (cows.length > 0) {
        const removedCow = cows[cows.length - 1];
        pasture.removeChild(removedCow);
        cowCount--;
        money += 20; // Each steak sells for $20
        updateStats();
    } else {
        alert('No cows to harvest!');
    }
}


// Reproduce cows and kill cows every 5 and 10 seconds respectively
setInterval(killCow, 20000);
let cheeseFactoryCount = 0;
let cheeseProductionPerFactory = 2;

function buyCheeseFactory() {
    if (money >= 200) { // Each cheese factory costs $200
        money -= 200;
        cheeseFactoryCount++;
        addCheeseFactory(); // Add a new cheese factory visually
        updateStats();
    } else {
        alert('Not enough money to buy a cheese factory!');
    }
}

function addCheeseFactory() {
    const cheeseFactoryContainer = document.querySelector('.cheese-factories');
    const cheeseFactory = document.createElement('div');
    cheeseFactory.className = 'cheese-factory';
    cheeseFactory.textContent = 'Factory';
    cheeseFactoryContainer.appendChild(cheeseFactory);
}

function updateCheeseProduction() {
    const totalCheeseProduction = cheeseFactoryCount * cheeseProductionPerFactory;
    cheeseCount += totalCheeseProduction;
    updateStats();
}

setInterval(updateCheeseProduction, 5000); // Update cheese production every 5 seconds
function buyPasture(pastureType) {
    let targetPage = '';

    // Determine the cost and target page based on the pasture type
    if (pastureType === 'sheep') {
        targetPage = '../Sheep/sheep.html';
    } else if (pastureType === 'pig') {
        targetPage = '../Pig/pig.html';
    }

    // Redirect to the target page
    window.location.href = targetPage;
}

function convertMilkToCheese() {
    const milkForCheese = Math.floor(milkCount / 5); // 5 milk required to make 1 cheese
    if (milkForCheese > 0) {
        milkCount -= milkForCheese * 5; // Deduct the milk used for cheese
        cheeseCount += milkForCheese; // Add the corresponding cheese
        updateStats(); // Update the displayed stats
    } else {
        alert('Not enough milk to make any cheese!');
    }
}
