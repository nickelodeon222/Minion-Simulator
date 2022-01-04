// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    minionSong.play();
    bananaAmount++;
    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(bananaAmount)} BANANAS`;
});


const saveButton = document.getElementById('saveButton');

saveButton.addEventListener("click", () => {
    save();
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener("click", () => {
    if (window.confirm('are you sure you want to delete it?')) {
        deleteSave();
        location.reload();
    }
});

// Increases your bananas by your BPS every second
const loop = setInterval(() => {
    // Displays your bps
    let bps = 0;
    allItems.forEach(item => {
        bps += item.profit();
        if (bananaAmount >= item.cost / 2 && item.button.hidden) {
            item.button.hidden = false;
        } 
    })
    
    const bpsCounter = document.getElementById('bpsCounter');
    bpsCounter.innerHTML = `${bps} bananas per second`;

    bananaAmount += bps;

    // if your bps doesn't equal zero, the minion eats the bananas, and the beps is shown
    if (!bps == 0) {
        const bananasEatenPerSecond = bps / 3 * bepsMultiplier;
        bepsMultiplier *= 1.001;
        bananaAmount -= bananasEatenPerSecond;
        eatenBananas += bananasEatenPerSecond;

        const bananasEatenCounter = document.getElementById('eatenBananasCount');
        bananasEatenCounter.innerHTML = `THE MINION HAS EATEN ${Math.floor(eatenBananas)} BANANAS`;

        const bepsCounter = document.getElementById('bepsCount');
        bepsCounter.innerHTML = `THE MINION EATS ${(bananasEatenPerSecond).toFixed(2)} OF YOUR BANANAS PER SECOND`
    }

    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(bananaAmount)} BANANAS`;

    if (bananaAmount < 0) {
        alert('THE MINION ATE ALL THE BANANAS');
        clearInterval(loop);
        bananaAmount = 0;   
    }

}, 1000);

