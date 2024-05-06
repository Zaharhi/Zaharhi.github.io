let pigCount = 2; // Start with two pigs
let hamCount = 0;
let baconCount = 0;
let money = 0;
let breedingFactor = 1; // Initial breeding factor
let breedingInterval = 10000; // Initial breeding interval in milliseconds

function updateStats() {
    document.getElementById('pigCount').textContent = pigCount;
    document.getElementById('hamCount').textContent = hamCount;
    document.getElementById('baconCount').textContent = baconCount;
    document.getElementById('moneyCount').textContent = money;
}

function addPig() {
    const pasture = document.getElementById('pasture');
    const pig = document.createElement('div');
    pig.className = 'pig'; // Use 'pig' class for all pigs
    pig.style.left = Math.floor(Math.random() * (600 - 50)) + 'px'; // Random left position
    pig.style.top = Math.floor(Math.random() * (400 - 50)) + 'px'; // Random top position
    pasture.appendChild(pig);
}

function removePig() {
    const pigs = document.getElementsByClassName('pig');
    if (pigs.length > 0) {
        const pasture = document.getElementById('pasture');
        pasture.removeChild(pigs[0]); // Remove the first pig
        pigCount--; // Decrement pig count
    }
}

function killPig() {
    if (pigCount >= 3) {
        removePig(); // Remove a pig visually
        hamCount++; // Each pig produces 1 ham
        updateStats();
    } else {
        alert('No pigs to kill!');
    }
}

function makeBacon() {
    if (hamCount >= 1) {
        hamCount--;
        baconCount += 5; // Each ham produces 5 bacon
        updateStats();
    } else {
        alert('No ham to make bacon!');
    }
}

function sellBacon() {
    if (baconCount >= 1) {
        baconCount--;
        money += 5; // Each bacon sells for $5
        updateStats();
    } else {
        alert('No bacon to sell!');
    }
}

function increaseBreeding() {
    if (money >= 50) { // Assuming upgrade costs $50
        money -= 50;
        breedingFactor++; // Increase breeding factor
        updateStats();
    } else {
        alert('Not enough money to increase breeding!');
    }
}

function increaseBreedingSpeed() {
    if (money >= 100) { // Assuming upgrade costs $100
        money -= 100;
        breedingInterval -= 1000; // Decrease breeding interval by 1 second
        updateStats();
    } else {
        alert('Not enough money to increase breeding speed!');
    }
}

// Automatic pig breeding based on breeding interval and factor
setInterval(function() {
    pigCount += breedingFactor; // Each breeding adds new pigs based on breeding factor
    for (let i = 0; i < breedingFactor; i++) {
        addPig(); // Add new pigs visually
    }
    updateStats();
}, breedingInterval);

// Update stats when the page loads
updateStats();
function buyPasture(pastureType) {
    let targetPage = '';

    // Determine the cost and target page based on the pasture type
    if (pastureType === 'sheep') {
        targetPage = '../Sheep/sheep.html';
    } else if (pastureType === 'cow') {
        targetPage = '../Cow/cow.html';
    }

    // Redirect to the target page
    window.location.href = targetPage;
}
