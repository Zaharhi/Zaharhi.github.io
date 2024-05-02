function buyPasture(pastureType) {
    let targetPage = '';

    // Determine the cost and target page based on the pasture type
    if (pastureType === 'sheep') {
        targetPage = 'Sheep/sheep.html';
    } else if (pastureType === 'pig') {
        targetPage = 'Pig/pig.html';
    } else if (pastureType === 'cow') {
        targetPage = 'Cow/cow.html';
    }

    // Redirect to the target page
    window.location.href = targetPage;
}
