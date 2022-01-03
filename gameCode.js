// Increases the number of bananas by one when the "Feed minion" button is clicked

feedButton.addEventListener('click', () => {
    minionSong.play();
    bananaAmount++;
    bananaCounter.innerHTML = `YOU HAVE ${Math.floor(bananaAmount)} BANANAS`;
});

// Buys a tree on click of the buy button
bananaTree.button.addEventListener('click', () => {
    if (bananaAmount >= bananaTree.cost) {
        bananaAmount -= bananaTree.cost;
        bananaTree.increase();
        bepsMultiplier = 1.01;
    }
})

// Buys a farm on click of the buy button
bananaFarm.button.addEventListener('click', () => {  ;
    if (bananaAmount >= bananaFarm.cost) {
        bananaAmount -= bananaFarm.cost;
        bananaFarm.increase()
        bepsMultiplier = 1.01;
    }
});

// Buys imported bananas when pressed
importedBananas.button.addEventListener('click', () => {  
    if (bananaAmount >= importedBananas.cost) {
        bananaAmount -= importedBananas.cost;
        importedBananas.increase();
        bepsMultiplier = 1.01;
    }
})

// Buys a slave on click of the buy button
slaveLabour.button.addEventListener('click', () => {  
    if (bananaAmount >= slaveLabour.cost) {
        bananaAmount -= slaveLabour.cost;
        slaveLabour.increase();
        bepsMultiplier = 1.01;
    }
})

// Buys a human slave on click of the buy button
humanLabour.button.addEventListener('click', () => {  
    if (bananaAmount >= humanLabour.cost) {
        bananaAmount -= humanLabour.cost;
        humanLabour.increase();
        bepsMultiplier = 1.01;
    }
})

killVector.button.addEventListener('click', () => {  
    if (bananaAmount >= killVector.cost) {
        bananaAmount -= killVector.cost;
        killVector.increase();
        bepsMultiplier = 1.01;
        vectorSound.play();
    }
})

const saveButton = document.getElementById('saveButton');

saveButton.addEventListener("click", () => {
    save();
});

const resetButton = document.getElementById('resetButton');

resetButton.addEventListener("click", () => {
    document.cookie.split(';').forEach(c => {
        document.cookie = c.trim().split('=')[0] + '=;' + 'expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      });
});

// Increases your bananas by your BPS every second
const loop = setInterval(() => {
    // Displays your bps
    const bps = bananaFarm.profit() + bananaTree.profit() + slaveLabour.profit() + humanLabour.profit() + importedBananas.profit() + killVector.profit();
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

    allItems.forEach(item => {
        if (bananaAmount >= item.cost / 2 && item.button.hidden) {
            item.button.hidden = false;
        } 
    })
}, 1000);

